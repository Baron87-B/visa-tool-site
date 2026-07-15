(function (root) {
  const STORAGE_KEY = "visaTool.cases";
  const ACTIVE_KEY = "visaTool.activeCaseId";

  function loadCases(destinations) {
    const parsed = readStoredCases();
    const cases = parsed.length > 0 ? parsed : starterCases(destinations);
    const activeCaseId = localStorage.getItem(ACTIVE_KEY) || cases[0]?.id || "";
    const activeCase = cases.find((item) => item.id === activeCaseId) || cases[0] || null;
    saveCases(cases, activeCase?.id || "");
    return { cases, activeCase };
  }

  function saveCases(cases, activeCaseId) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
    if (activeCaseId) localStorage.setItem(ACTIVE_KEY, activeCaseId);
    return {
      cases,
      activeCase: cases.find((item) => item.id === activeCaseId) || cases[0] || null
    };
  }

  function createCase({ destination, profileLabel, purposeLabel, jurisdiction, snapshot }) {
    const now = new Date().toISOString();
    return {
      id: `case_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: `${destination.name}${purposeLabel.replace(/\/.*/, "")}签`,
      destinationId: destination.id,
      meta: `${jurisdiction} | 草稿`,
      profileLabel,
      purposeLabel,
      createdAt: now,
      updatedAt: now,
      snapshot: snapshot || {}
    };
  }

  function updateCase(caseItem, updates) {
    return {
      ...caseItem,
      ...updates,
      snapshot: { ...(caseItem.snapshot || {}), ...(updates.snapshot || {}) },
      updatedAt: new Date().toISOString()
    };
  }

  function readStoredCases() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function starterCases(destinations) {
    return ["schengen-spain", "us-b1b2", "japan-short", "canada-visitor"]
      .map((id) => destinations.find((item) => item.id === id))
      .filter(Boolean)
      .map((destination, index) => ({
        id: `starter_${destination.id}`,
        name: `${destination.name}${index === 0 ? "旅游签" : "资料"}`,
        destinationId: destination.id,
        meta: `${destination.defaultJurisdiction} | ${index === 0 ? "进行中" : "草稿"}`,
        profileLabel: "在职成人",
        purposeLabel: "旅游/观光",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        snapshot: {}
      }));
  }

  root.VISA_CASE_STORE = { loadCases, saveCases, createCase, updateCase };
})(typeof window !== "undefined" ? window : globalThis);
