(function (root) {
  function buildFolderPlan({ destinationShortName, visaType, profileLabel, documents }) {
    const rootName = safeName(`${destinationShortName}_${visaType}_${profileLabel}`);
    const usefulDocs = documents.filter((doc) => doc.type !== "low_value");
    const folders = [...new Set(usefulDocs.map((doc) => doc.folder))].sort();
    const lines = [`${rootName}/`];
    folders.forEach((folder) => {
      lines.push(`  ${folder}/`);
      usefulDocs.filter((doc) => doc.folder === folder).forEach((doc) => {
        lines.push(`    - ${doc.name}`);
      });
    });
    return {
      root: rootName,
      folders,
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

  function safeName(value) {
    return String(value)
      .replace(/[\\/:*?"<>|]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");
  }

  root.VISA_FOLDER_ENGINE = { buildFolderPlan, canCreateLocalFolders, createLocalFolders };
})(typeof window !== "undefined" ? window : globalThis);
