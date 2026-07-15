(function (root) {
  function buildFolderPlan({ destinationShortName, visaType, profileLabel, documents }) {
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
    return {
      root: rootName,
      folders,
      documentLocations,
      folderDocuments,
      tree: lines.join("\n"),
      mkdirCommand: folders.map((folder) => `mkdir -p "${rootName}/${folder}"`).join("\n")
    };
  }

  function canCreateLocalFolders(scope) {
    return typeof scope.showDirectoryPicker === "function";
  }

  async function createLocalFolders(plan, scope) {
    const rootHandle = await scope.showDirectoryPicker({ mode: "readwrite" });
    const caseHandle = await rootHandle.getDirectoryHandle(plan.root, { create: true });
    for (const folder of plan.folders) {
      await caseHandle.getDirectoryHandle(folder, { create: true });
    }
    return { root: plan.root, count: plan.folders.length };
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

  function safeName(value) {
    return String(value)
      .replace(/[\\/:*?"<>|]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");
  }

  root.VISA_FOLDER_ENGINE = { buildFolderPlan, canCreateLocalFolders, createLocalFolders, scanFolderFiles, scanLocalFolders };
})(typeof window !== "undefined" ? window : globalThis);
