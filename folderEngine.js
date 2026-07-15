(function (root) {
  function buildFolderPlan({ destinationShortName, visaType, profileLabel, documents, templatesByDocId = {} }) {
    const rootName = safeName(`${destinationShortName}_${visaType}_${profileLabel}`);
    const usefulDocs = documents.filter((doc) => doc.type !== "low_value");
    const folders = [...new Set(usefulDocs.map((doc) => doc.folder))].sort();
    const documentLocations = {};
    const folderDocuments = {};
    const lines = [`${rootName}/`];
    folders.forEach((folder) => {
      lines.push(`  ${folder}/`);
      usefulDocs.filter((doc) => doc.folder === folder).forEach((doc) => {
        const docId = doc.id || safeName(doc.name);
        const path = `${rootName}/${folder}`;
        if (!folderDocuments[folder]) folderDocuments[folder] = [];
        const location = {
          docId,
          name: doc.name,
          folder,
          template: doc.template || "",
          path
        };
        documentLocations[docId] = location;
        folderDocuments[folder].push(location);
        lines.push(`    - ${doc.name}`);
      });
    });
    const templateFiles = buildTemplateFiles(rootName, folders, folderDocuments, templatesByDocId);
    return {
      root: rootName,
      folders,
      documentLocations,
      folderDocuments,
      tree: lines.join("\n"),
      templateFiles,
      mkdirCommand: [
        ...folders.map((folder) => `mkdir -p "${shellQuotePath(`${rootName}/${folder}`)}"`),
        ...templateFiles.map((file) => heredocCommand(file.path, file.content))
      ].join("\n")
    };
  }

  function canCreateLocalFolders(scope) {
    return typeof scope.showDirectoryPicker === "function";
  }

  async function createLocalFolders(plan, scope) {
    const rootHandle = await scope.showDirectoryPicker({ mode: "readwrite" });
    const caseHandle = await rootHandle.getDirectoryHandle(plan.root, { create: true });
    const folderHandles = {};
    for (const folder of plan.folders) {
      folderHandles[folder] = await caseHandle.getDirectoryHandle(folder, { create: true });
    }
    for (const file of plan.templateFiles || []) {
      const folderHandle = folderHandles[file.folder] || await caseHandle.getDirectoryHandle(file.folder, { create: true });
      const fileHandle = await folderHandle.getFileHandle(file.filename, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(file.content);
      await writable.close();
    }
    return { root: plan.root, count: plan.folders.length, fileCount: (plan.templateFiles || []).length };
  }

  function scanFolderFiles(plan, folderFiles) {
    const byDocId = {};
    const summary = { detected: 0, missing: 0 };
    Object.values(plan.documentLocations || {}).forEach((location) => {
      const files = filesForFolder(folderFiles, location.folder);
      const status = files.length > 0 ? "detected" : "missing";
      byDocId[location.docId] = {
        docId: location.docId,
        folder: location.folder,
        path: location.path,
        status,
        fileCount: files.length,
        files
      };
      summary[status] += 1;
    });
    return { byDocId, summary };
  }

  async function scanLocalFolders(plan, scope) {
    const rootHandle = await scope.showDirectoryPicker({ mode: "read" });
    const folderFiles = {};
    for (const folder of plan.folders) {
      try {
        const folderHandle = await rootHandle.getDirectoryHandle(folder);
        folderFiles[folder] = await listFiles(folderHandle);
      } catch {
        folderFiles[folder] = [];
      }
    }
    return scanFolderFiles(plan, folderFiles);
  }

  async function listFiles(directoryHandle) {
    const files = [];
    for await (const entry of directoryHandle.values()) {
      if (entry.kind === "file") {
        files.push(entry.name);
      }
    }
    return files;
  }

  function filesForFolder(folderFiles, folder) {
    if (!folderFiles) return [];
    if (Array.isArray(folderFiles[folder])) return folderFiles[folder].filter(Boolean);
    return [];
  }

  function buildTemplateFiles(rootName, folders, folderDocuments, templatesByDocId) {
    const files = [];
    folders.forEach((folder) => {
      const docs = folderDocuments[folder] || [];
      files.push({
        kind: "readme",
        folder,
        filename: "README_资料准备说明.md",
        path: `${rootName}/${folder}/README_资料准备说明.md`,
        content: folderReadmeContent(folder, docs, templatesByDocId)
      });
      const usedNames = new Set(["README_资料准备说明.md"]);
      docs.forEach((doc) => {
        const templates = Array.isArray(templatesByDocId[doc.docId]) ? templatesByDocId[doc.docId] : [];
        templates.forEach((template) => {
          const file = templateFile(rootName, folder, doc, template, usedNames);
          if (file) files.push(file);
        });
      });
    });
    return files;
  }

  function folderReadmeContent(folder, docs, templatesByDocId) {
    const docLines = docs.map((doc) => {
      const templates = Array.isArray(templatesByDocId[doc.docId]) ? templatesByDocId[doc.docId] : [];
      const templateText = templates.length
        ? templates.map((template) => template.title || template.filename || template.url).join("、")
        : "暂无额外模板";
      return `- ${doc.name}：${doc.template || "按官方要求准备"}；模板/官方链接：${templateText}`;
    });
    return [
      `# ${folder}`,
      "",
      "## 本资料夹对应材料",
      ...docLines,
      "",
      "## 使用提醒",
      "- 请只放入真实、可核验、与申请表一致的材料。",
      "- 本工具提供资料准备模板、官方入口和整理结构，不代替领馆、签证中心或移民局的最终要求。",
      "- 官方表格链接可能要求在线填写或登录，请以打开后的官方网站页面为准。"
    ].join("\n");
  }

  function templateFile(rootName, folder, doc, template, usedNames) {
    if (!template) return null;
    const baseFilename = template.filename || defaultTemplateFilename(template);
    const filename = uniqueFilename(baseFilename, usedNames);
    const content = templateContent(doc, template);
    return {
      kind: template.kind || "template",
      docId: doc.docId,
      title: template.title || doc.name,
      folder,
      filename,
      path: `${rootName}/${folder}/${filename}`,
      content
    };
  }

  function defaultTemplateFilename(template) {
    if (template.kind === "official_link") {
      return `官方表格_${safeName(template.title || "官方入口")}.txt`;
    }
    return `模板_${safeName(template.title || "资料准备")}.md`;
  }

  function templateContent(doc, template) {
    if (template.kind === "official_link") {
      return [
        `${template.title || "官方表格"}`,
        "",
        `对应材料：${doc.name}`,
        `官方链接：${template.url || ""}`,
        template.sourceName ? `来源：${template.sourceName}` : "",
        template.note ? `说明：${template.note}` : "",
        "",
        "请在官方网站填写、下载或核对表格。工具只保存入口说明，不复制或替代官方表格。"
      ].filter(Boolean).join("\n");
    }
    return template.content || `# ${template.title || doc.name}\n\n对应材料：${doc.name}\n请替换为真实信息后使用。`;
  }

  function uniqueFilename(filename, usedNames) {
    const cleaned = safeFileName(filename);
    if (!usedNames.has(cleaned)) {
      usedNames.add(cleaned);
      return cleaned;
    }
    const dot = cleaned.lastIndexOf(".");
    const base = dot > 0 ? cleaned.slice(0, dot) : cleaned;
    const ext = dot > 0 ? cleaned.slice(dot) : "";
    let index = 2;
    let next = `${base}_${index}${ext}`;
    while (usedNames.has(next)) {
      index += 1;
      next = `${base}_${index}${ext}`;
    }
    usedNames.add(next);
    return next;
  }

  function safeFileName(value) {
    return String(value || "模板.md")
      .replace(/[\\/:*?"<>|]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");
  }

  function shellQuotePath(path) {
    return String(path).replace(/["\\$`]/g, "\\$&");
  }

  function heredocCommand(path, content) {
    const delimiter = "__VISA_TOOL_TEMPLATE_EOF__";
    return `cat > "${shellQuotePath(path)}" <<'${delimiter}'\n${content}\n${delimiter}`;
  }

  function safeName(value) {
    return String(value)
      .replace(/[\\/:*?"<>|]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");
  }

  root.VISA_FOLDER_ENGINE = { buildFolderPlan, canCreateLocalFolders, createLocalFolders, scanFolderFiles, scanLocalFolders };
})(typeof window !== "undefined" ? window : globalThis);
