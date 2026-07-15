(function () {
  const data = window.VISA_DATA;
  const labels = {
    required: "必需材料",
    conditional: "条件必需",
    supporting: "支持材料",
    low_value: "低价值/不推荐"
  };
  const itineraryReliabilityNote = "不自动生成酒店；酒店和地址必须由用户填写并通过地图核对。";
  const generatedHotelPlaceholders = new Set([
    "Hotel Madrid Centro|Calle Mayor 1, Madrid",
    "Hotel Barcelona Port|La Rambla 2, Barcelona",
    "Midtown Hotel|5th Avenue, New York",
    "Downtown Hotel|South Grand Avenue, Los Angeles",
    "London Central Hotel|Strand, London",
    "Vancouver Downtown Hotel|Robson Street, Vancouver",
    "Toronto Centre Hotel|King Street, Toronto",
    "Sydney Harbour Hotel|George Street, Sydney",
    "Melbourne Central Hotel|Swanston Street, Melbourne",
    "Auckland City Hotel|Queen Street, Auckland",
    "Queenstown Lake Hotel|Lake Esplanade, Queenstown",
    "Tokyo Station Hotel|Marunouchi, Tokyo",
    "Osaka Namba Hotel|Namba, Osaka",
    "Seoul Myeongdong Hotel|Myeongdong, Seoul",
    "Hanoi Old Quarter Hotel|Hoan Kiem, Hanoi",
    "Saigon Central Hotel|District 1, Ho Chi Minh City",
    "Moscow Centre Hotel|Tverskaya Street, Moscow",
    "Nevsky Hotel|Nevsky Prospekt, Saint Petersburg"
  ]);
  const initialCaseData = window.VISA_CASE_STORE.loadCases(data.destinations);
  const initialSnapshot = initialCaseData.activeCase?.snapshot || {};
  const initialDestinationId = initialCaseData.activeCase?.destinationId || "schengen-spain";

  const state = {
    destinationId: initialDestinationId,
    profile: initialSnapshot.profile || "employed",
    purpose: initialSnapshot.purpose || "tourism",
    party: initialSnapshot.party || "solo",
    income: initialSnapshot.income || "high",
    invitation: initialSnapshot.invitation || false,
    jurisdiction: initialSnapshot.jurisdiction || "",
    filter: initialSnapshot.filter || "all",
    selectedDocId: initialSnapshot.selectedDocId || "",
    tab: "flow",
    cases: initialCaseData.cases,
    activeCaseId: initialCaseData.activeCase?.id || "",
    statuses: initialSnapshot.statuses || {},
    folderScan: initialSnapshot.folderScan || {},
    formFieldValues: initialSnapshot.formFieldValues || loadFormFieldValues(),
    itinerary: itineraryForSnapshot(initialSnapshot, initialDestinationId),
    timeline: initialSnapshot.timeline || loadTimelineValues(),
    folderPlan: null,
    watermark: {
      file: null,
      objectUrl: "",
      renderedUrl: "",
      filename: "",
      mimeType: ""
    }
  };

  const els = {
    destinationList: document.getElementById("destinationList"),
    caseList: document.getElementById("caseList"),
    caseTitle: document.getElementById("caseTitle"),
    caseMeta: document.getElementById("caseMeta"),
    lastChecked: document.getElementById("lastChecked"),
    profileSelect: document.getElementById("profileSelect"),
    purposeSelect: document.getElementById("purposeSelect"),
    partySelect: document.getElementById("partySelect"),
    jurisdictionSelect: document.getElementById("jurisdictionSelect"),
    incomeSelect: document.getElementById("incomeSelect"),
    invitationToggle: document.getElementById("invitationToggle"),
    summaryStrip: document.getElementById("summaryStrip"),
    filters: document.getElementById("filters"),
    flowSteps: document.getElementById("flowSteps"),
    timelineSubmissionDate: document.getElementById("timelineSubmissionDate"),
    timelineDepartureDate: document.getElementById("timelineDepartureDate"),
    timelineStampToggle: document.getElementById("timelineStampToggle"),
    timelineTranslationToggle: document.getElementById("timelineTranslationToggle"),
    timelineRows: document.getElementById("timelineRows"),
    documentTable: document.getElementById("documentTable"),
    inspector: document.getElementById("documentInspector"),
    folderTree: document.getElementById("folderTree"),
    folderDocumentMap: document.getElementById("folderDocumentMap"),
    mkdirCommand: document.getElementById("mkdirCommand"),
    folderStatus: document.getElementById("folderStatus"),
    sourceList: document.getElementById("sourceList"),
    iterationList: document.getElementById("iterationList"),
    formMapping: document.getElementById("formMapping"),
    itineraryStartDate: document.getElementById("itineraryStartDate"),
    itineraryOriginCity: document.getElementById("itineraryOriginCity"),
    itineraryReturnCity: document.getElementById("itineraryReturnCity"),
    itineraryPace: document.getElementById("itineraryPace"),
    itineraryInboundFlight: document.getElementById("itineraryInboundFlight"),
    itineraryOutboundFlight: document.getElementById("itineraryOutboundFlight"),
    itineraryCitiesInput: document.getElementById("itineraryCitiesInput"),
    itineraryCityOptions: document.getElementById("itineraryCityOptions"),
    itineraryCityRows: document.getElementById("itineraryCityRows"),
    itineraryChecks: document.getElementById("itineraryChecks"),
    itinerarySummary: document.getElementById("itinerarySummary"),
    itineraryResult: document.getElementById("itineraryResult"),
    watermarkApplicantName: document.getElementById("watermarkApplicantName"),
    watermarkFileInput: document.getElementById("watermarkFileInput"),
    watermarkText: document.getElementById("watermarkText"),
    watermarkPreview: document.getElementById("watermarkPreview"),
    toast: document.getElementById("toast")
  };

  function destination() {
    return data.destinations.find((item) => item.id === state.destinationId) || data.destinations[0];
  }

  function docRule(id) {
    return data.documentRules[id];
  }

  function visibleDocuments(dest = destination()) {
    return dest.documents.map((id) => ({ id, ...docRule(id) })).filter(Boolean).map(applyDynamicType);
  }

  function templateLibrary() {
    return data.templateLibrary || { officialForms: {}, preparationTemplates: {}, documentTemplates: {}, destinationTemplates: {} };
  }

  function templatesForDocument(docId) {
    const library = templateLibrary();
    const generalIds = library.documentTemplates?.[docId] || [];
    const destinationIds = library.destinationTemplates?.[state.destinationId]?.[docId] || [];
    const seen = new Set();
    return [...destinationIds, ...generalIds]
      .filter((id) => {
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      })
      .map((id) => {
        const official = library.officialForms?.[id];
        if (official) return { id, kind: "official_link", ...official };
        const template = library.preparationTemplates?.[id];
        if (template) return { id, kind: "template", ...template };
        return null;
      })
      .filter(Boolean);
  }

  function templatesByDocId(docs) {
    return docs.reduce((memo, doc) => {
      const templates = templatesForDocument(doc.id);
      if (templates.length) memo[doc.id] = templates;
      return memo;
    }, {});
  }

  function applyDynamicType(doc) {
    const next = { ...doc };
    const profileMatches = {
      employment_letter: ["employed"],
      employment_letter_support: ["employed"],
      business_license_copy: ["employed"],
      student_certificate: ["student", "minor"],
      retirement_certificate: ["retired"],
      minor_consent: ["minor"],
      relationship_proof: ["minor"],
      invitation_letter: ["family_visit"],
      host_id_or_residence: ["family_visit"],
      business_invitation: ["business"]
    };

    if (profileMatches[next.id] && !profileMatches[next.id].includes(state.profile) && !profileMatches[next.id].includes(state.purpose)) {
      next.type = "supporting";
      next.summary = "当前画像下通常不是核心材料，可按实际情况保留。";
    }

    if (next.id === "relationship_proof" && (state.party === "family" || state.purpose === "family_visit" || state.profile === "minor")) {
      next.type = "conditional";
    }

    if ((next.id === "invitation_letter" || next.id === "host_id_or_residence") && (state.invitation || state.purpose === "family_visit")) {
      next.type = "conditional";
    }

    if (next.id === "business_invitation" && state.purpose === "business") {
      next.type = "conditional";
    }

    return next;
  }

  function filteredDocuments() {
    const docs = visibleDocuments();
    if (state.filter === "all") return docs;
    return docs.filter((doc) => doc.type === state.filter);
  }

  function counts() {
    return visibleDocuments().reduce(
      (acc, doc) => {
        acc.all += 1;
        acc[doc.type] += 1;
        return acc;
      },
      { all: 0, required: 0, conditional: 0, supporting: 0, low_value: 0 }
    );
  }

  function renderDestinations() {
    els.destinationList.innerHTML = data.destinations
      .map((item) => {
        const active = item.id === state.destinationId ? "active" : "";
        return `<button class="destination-button ${active}" data-destination="${item.id}">
          <span class="destination-name">${item.name}</span>
          <span class="destination-meta">${item.visaType}</span>
        </button>`;
      })
      .join("");
  }

  function renderCases() {
    els.caseList.innerHTML = state.cases
      .map((caseItem) => {
        const active = caseItem.id === state.activeCaseId ? "active" : "";
        return `<div class="case-row ${active}">
          <button class="case-button ${active}" data-case="${caseItem.id}">
            <span class="case-name">${escapeHtml(caseItem.name)}</span>
            <span class="case-meta">${escapeHtml(caseItem.meta)}</span>
          </button>
          <button class="case-delete-button" type="button" data-delete-case="${caseItem.id}" aria-label="删除 ${escapeHtml(caseItem.name)}">删除</button>
        </div>`;
      })
      .join("");
  }

  function casePurposeLabel() {
    return {
      tourism: "旅游/观光",
      family_visit: "探亲访友",
      business: "商务/会议"
    }[state.purpose];
  }

  function currentSnapshot() {
    return {
      destinationId: state.destinationId,
      profile: state.profile,
      purpose: state.purpose,
      party: state.party,
      income: state.income,
      invitation: state.invitation,
      jurisdiction: els.jurisdictionSelect.value || state.jurisdiction,
      filter: state.filter,
      selectedDocId: state.selectedDocId,
      statuses: state.statuses,
      folderScan: state.folderScan,
      formFieldValues: state.formFieldValues,
      itinerary: state.itinerary,
      timeline: state.timeline
    };
  }

  function saveActiveCase({ quiet = false } = {}) {
    const activeCase = state.cases.find((item) => item.id === state.activeCaseId);
    if (!activeCase) return;
    const updated = window.VISA_CASE_STORE.updateCase(activeCase, {
      destinationId: state.destinationId,
      meta: `${els.jurisdictionSelect.value || destination().defaultJurisdiction} | 已保存`,
      snapshot: currentSnapshot()
    });
    state.cases = state.cases.map((item) => (item.id === updated.id ? updated : item));
    window.VISA_CASE_STORE.saveCases(state.cases, state.activeCaseId);
    renderCases();
    if (!quiet) showToast("案件已保存到本机浏览器");
  }

  function createNewCase() {
    const created = window.VISA_CASE_STORE.createCase({
      destination: destination(),
      profileLabel: profileLabel(),
      purposeLabel: casePurposeLabel(),
      jurisdiction: els.jurisdictionSelect.value || destination().defaultJurisdiction,
      snapshot: currentSnapshot()
    });
    state.cases = [created, ...state.cases];
    state.activeCaseId = created.id;
    window.VISA_CASE_STORE.saveCases(state.cases, state.activeCaseId);
    render();
    showToast("新案件已创建并保存在本机");
  }

  function findCaseForDestination(destinationId) {
    return state.cases.find((item) => item.destinationId === destinationId) || null;
  }

  function resetDestinationScopedState(destinationId) {
    const dest = data.destinations.find((item) => item.id === destinationId) || data.destinations[0];
    return {
      destinationId,
      profile: state.profile,
      purpose: state.purpose,
      party: state.party,
      income: state.income,
      invitation: state.invitation,
      jurisdiction: dest.defaultJurisdiction,
      filter: "all",
      selectedDocId: "",
      statuses: {},
      folderScan: {},
      formFieldValues: state.formFieldValues,
      itinerary: loadItineraryValues(destinationId),
      timeline: state.timeline
    };
  }

  function setActiveCase(caseId) {
    const caseItem = state.cases.find((item) => item.id === caseId);
    if (!caseItem) return;
    state.activeCaseId = caseItem.id;
    state.destinationId = caseItem.destinationId;
    applyCaseSnapshot(caseItem.snapshot || {});
    window.VISA_CASE_STORE.saveCases(state.cases, state.activeCaseId);
    syncProfileInputs();
    syncTimelineInputs();
    syncItineraryInputs();
    render();
  }

  function deleteCase(caseId) {
    if (state.cases.length <= 1) {
      showToast("至少保留一个案件");
      return;
    }
    const caseItem = state.cases.find((item) => item.id === caseId);
    if (!caseItem) return;
    if (!window.confirm(`删除案件「${caseItem.name}」？此操作只会删除本机浏览器里的案件记录。`)) {
      return;
    }
    const nextCases = window.VISA_CASE_STORE.deleteCase(state.cases, caseId);
    const nextActiveCase = caseId === state.activeCaseId
      ? nextCases[0]
      : nextCases.find((item) => item.id === state.activeCaseId) || nextCases[0];
    state.cases = nextCases;
    state.activeCaseId = nextActiveCase.id;
    state.destinationId = nextActiveCase.destinationId;
    applyCaseSnapshot(nextActiveCase.snapshot || {});
    window.VISA_CASE_STORE.saveCases(state.cases, state.activeCaseId);
    syncProfileInputs();
    syncTimelineInputs();
    syncItineraryInputs();
    render();
    showToast("案件已删除");
  }

  function applyCaseSnapshot(snapshot) {
    state.profile = snapshot.profile || "employed";
    state.purpose = snapshot.purpose || "tourism";
    state.party = snapshot.party || "solo";
    state.income = snapshot.income || "high";
    state.invitation = Boolean(snapshot.invitation);
    state.jurisdiction = snapshot.jurisdiction || "";
    state.filter = snapshot.filter || "all";
    state.selectedDocId = snapshot.selectedDocId || "";
    state.statuses = snapshot.statuses || {};
    state.folderScan = snapshot.folderScan || {};
    state.formFieldValues = snapshot.formFieldValues || loadFormFieldValues();
    state.itinerary = itineraryForSnapshot(snapshot, state.destinationId);
    state.timeline = snapshot.timeline || loadTimelineValues();
  }

  function itineraryForSnapshot(snapshot, destinationId) {
    if (snapshot.itinerary?.destinationId === destinationId) {
      return snapshot.itinerary;
    }
    return loadItineraryValues(destinationId);
  }

  function syncProfileInputs() {
    els.profileSelect.value = state.profile;
    els.purposeSelect.value = state.purpose;
    els.partySelect.value = state.party;
    els.incomeSelect.value = state.income;
    els.invitationToggle.checked = state.invitation;
  }

  function renderHeader() {
    const dest = destination();
    const activeCase = state.cases.find((item) => item.id === state.activeCaseId);
    els.caseTitle.textContent = `${dest.name}${state.purpose === "business" ? "商务" : state.purpose === "family_visit" ? "探亲访友" : "旅游"}签`;
    els.caseMeta.textContent = `申请人：中国大陆普通护照 / ${profileLabel()} / ${dest.defaultJurisdiction}${activeCase ? "" : " / 未保存草稿"}`;
    els.lastChecked.textContent = `最后核验：${dest.lastChecked}`;
    els.jurisdictionSelect.innerHTML = dest.jurisdictions.map((item) => `<option>${item}</option>`).join("");
    els.jurisdictionSelect.value = state.jurisdiction || dest.defaultJurisdiction;
  }

  function profileLabel() {
    return {
      employed: "在职成人",
      self_employed: "自由职业",
      student: "学生",
      retired: "退休人员",
      minor: "未成年人"
    }[state.profile];
  }

  function renderSummary() {
    const c = counts();
    els.summaryStrip.innerHTML = [
      ["必需材料", c.required, "required"],
      ["条件必需", c.conditional, "conditional"],
      ["支持材料", c.supporting, "supporting"],
      ["低价值/不推荐", c.low_value, "low_value"]
    ]
      .map(([label, value, type]) => `<div class="metric"><span>${label}</span><strong class="${type}">${value}</strong></div>`)
      .join("");
  }

  function renderFilters() {
    const c = counts();
    const filters = [
      ["all", `全部 ${c.all}`],
      ["required", `必需材料 ${c.required}`],
      ["conditional", `条件必需 ${c.conditional}`],
      ["supporting", `支持材料 ${c.supporting}`],
      ["low_value", `低价值/不推荐 ${c.low_value}`]
    ];
    els.filters.innerHTML = filters
      .map(([id, label]) => `<button class="filter-button ${state.filter === id ? "active" : ""}" data-filter="${id}">${label}</button>`)
      .join("");
  }

  function renderFlow() {
    const steps = window.VISA_FLOW_ENGINE.buildFlowSteps({
      destination: destination(),
      documents: visibleDocuments(),
      statuses: state.statuses,
      hasFormMapping: Boolean(formMapping()),
      hasTimeline: Boolean(state.timeline.submissionDate),
      hasItinerary: Boolean(window.VISA_ITINERARY_RULES?.[state.destinationId])
    });
    els.flowSteps.innerHTML = steps
      .map(
        (step, index) => `<article class="flow-step ${step.status}" data-flow-tab="${step.tab}" data-flow-station="${index + 1}">
          <div class="flow-step-checkin">
            <div class="flow-step-index">${index + 1}</div>
            <div class="flow-station-kiwi" aria-hidden="true">
              <span class="flow-station-body"></span>
              <span class="flow-station-beak"></span>
            </div>
            <div class="flow-station-line"></div>
            <span class="flow-stamp">${flowStampLabel(step.status)}</span>
          </div>
          <div>
            <h3>${step.title}</h3>
            <p>${step.goal}</p>
            <div class="flow-step-meta">
              <span>${flowStatusLabel(step.status)}</span>
              <span>预计 ${step.estimatedDays} 天</span>
              ${step.requiredDocs ? `<span>${step.requiredDocs} 项材料</span>` : ""}
            </div>
          </div>
          <button class="ghost-button" data-flow-action="${step.tab}">${step.actionLabel}</button>
        </article>`
      )
      .join("");
    renderTimeline();
    renderWatermarkText();
  }

  function flowStatusLabel(status) {
    return {
      done: "已完成",
      in_progress: "进行中",
      ready: "可开始",
      waiting: "待开始"
    }[status] || "待开始";
  }

  function flowStampLabel(status) {
    return {
      done: "已打卡",
      in_progress: "当前站",
      ready: "下一站",
      waiting: "待出发"
    }[status] || "待出发";
  }

  function renderTable() {
    const docs = filteredDocuments();
    if (!docs.find((doc) => doc.id === state.selectedDocId)) {
      state.selectedDocId = docs[0]?.id || "";
    }

    els.documentTable.innerHTML = docs
      .map((doc, index) => {
        const selected = doc.id === state.selectedDocId ? "selected" : "";
        const status = state.statuses[doc.id] || "pending";
        const location = state.folderPlan?.documentLocations?.[doc.id];
        const scan = state.folderScan?.[doc.id];
        return `<tr class="${selected}" data-doc="${doc.id}">
          <td class="col-index">${index + 1}</td>
          <td>
            <div class="doc-name">${doc.name}</div>
            <div class="doc-note">${doc.summary}</div>
            ${location ? `<div class="doc-folder-link">资料夹：${escapeHtml(location.folder)}${scan?.fileCount ? ` · 检测到 ${scan.fileCount} 个文件` : ""}</div>` : ""}
          </td>
          <td><span class="badge ${doc.type}">${labels[doc.type]}</span></td>
          <td>
            <select class="status-select" data-status-doc="${doc.id}">
              <option value="pending" ${status === "pending" ? "selected" : ""}>未开始</option>
              <option value="uploading" ${status === "uploading" ? "selected" : ""}>待上传</option>
              <option value="detected" ${status === "detected" ? "selected" : ""}>已检测到文件</option>
              <option value="review" ${status === "review" ? "selected" : ""}>需要复核</option>
              <option value="done" ${status === "done" ? "selected" : ""}>已完成</option>
              <option value="not_applicable" ${status === "not_applicable" ? "selected" : ""}>不适用</option>
            </select>
          </td>
          <td><div class="doc-actions">
            <button data-inspect="${doc.id}">查看</button>
            ${location ? `<button data-go-folder="${doc.id}">资料夹</button>` : ""}
          </div></td>
        </tr>`;
      })
      .join("");
  }

  function renderInspector() {
    const dest = destination();
    const doc = visibleDocuments().find((item) => item.id === state.selectedDocId) || visibleDocuments()[0];
    if (!doc) {
      els.inspector.innerHTML = "<p class=\"muted\">当前没有资料。</p>";
      return;
    }
    const sources = dest.sources
      .map(
        (source) => `<div class="source-card">
          <strong>${source.title}</strong>
          <a href="${source.url}" target="_blank" rel="noreferrer">${source.url}</a>
          <div class="source-meta">
            <span>来源：${source.authority === "official_government" ? "政府官方" : "官方签证中心"}</span>
            <span>核验：${source.lastChecked}</span>
            <span class="badge ${source.confidence}">置信度：${source.confidence === "high" ? "高" : "中"}</span>
          </div>
        </div>`
      )
      .join("");

    els.inspector.innerHTML = `<h2>${doc.name}</h2>
      <p><span class="badge ${doc.type}">${labels[doc.type]}</span></p>
      <p class="muted">${doc.detail}</p>
      <div class="detail-section">
        <h3>适用条件</h3>
        <p class="muted">${doc.appliesTo}</p>
      </div>
      <div class="detail-section">
        <h3>资料夹位置</h3>
        <p class="muted">${doc.folder}</p>
        <button class="secondary-button compact-button" data-go-folder="${doc.id}">跳到资料夹</button>
      </div>
      <div class="detail-section">
        <h3>模板槽位</h3>
        <p class="muted">${doc.template || "暂无模板"}</p>
      </div>
      ${renderDocumentTemplates(doc)}
      <div class="detail-section">
        <h3>官方来源</h3>
        ${sources}
      </div>`;
  }

  function renderDocumentTemplates(doc) {
    const templates = templatesForDocument(doc.id);
    if (!templates.length) {
      return `<div class="detail-section">
        <h3>模板与官方表格</h3>
        <p class="muted">当前资料项暂无专用模板；请按官方来源和资料夹说明准备真实材料。</p>
      </div>`;
    }
    return `<div class="detail-section">
      <h3>模板与官方表格</h3>
      <div class="template-list">
        ${templates.map((template) => renderTemplateCard(doc, template)).join("")}
      </div>
    </div>`;
  }

  function renderTemplateCard(doc, template) {
    const isOfficial = template.kind === "official_link";
    return `<article class="template-card ${isOfficial ? "official" : "prepared"}">
      <div>
        <span class="template-kind">${isOfficial ? "官方表格" : "可填写模板"}</span>
        <strong>${escapeHtml(template.title || doc.name)}</strong>
        <p>${escapeHtml(template.note || (isOfficial ? "在官方网站填写、下载或核对，表格要求以官网为准。" : "下载后替换为真实信息，可放入对应资料夹。"))}</p>
      </div>
      ${
        isOfficial
          ? `<a class="secondary-button compact-button" href="${escapeHtml(template.url)}" target="_blank" rel="noreferrer">打开官方</a>`
          : `<button class="secondary-button compact-button" type="button" data-download-template="${escapeHtml(template.id)}" data-template-doc="${escapeHtml(doc.id)}">下载模板</button>`
      }
    </article>`;
  }

  function renderFolders() {
    const dest = destination();
    const docs = visibleDocuments().filter((doc) => doc.type !== "low_value");
    const documentTemplates = templatesByDocId(docs);
    const plan = window.VISA_FOLDER_ENGINE.buildFolderPlan({
      destinationShortName: dest.shortName,
      visaType: dest.visaType,
      profileLabel: profileLabel(),
      documents: docs,
      templatesByDocId: documentTemplates
    });
    state.folderPlan = plan;
    els.folderTree.textContent = plan.tree;
    els.mkdirCommand.value = plan.mkdirCommand;
    els.folderDocumentMap.innerHTML = renderFolderDocumentMap(plan);
    const canCreate = window.VISA_FOLDER_ENGINE.canCreateLocalFolders(window);
    els.folderStatus.innerHTML = `<strong>${plan.root}</strong>
      <span>${plan.folders.length} 个资料夹，${Object.keys(plan.documentLocations).length} 项资料已建立对应关系，${plan.templateFiles.length} 个模板/说明文件。${canCreate ? "可选择案件资料夹扫描文件，系统只判断是否放入文件，不判断内容真实性。" : "当前浏览器不支持直接扫描或创建，可下载脚本或复制命令。"}</span>`;
  }

  function renderFolderDocumentMap(plan) {
    return plan.folders
      .map((folder) => {
        const docs = plan.folderDocuments[folder] || [];
        return `<section class="folder-map-card" data-folder-name="${escapeHtml(folder)}">
          <div class="folder-map-head">
            <strong>${escapeHtml(folder)}</strong>
            <span>${docs.length} 项资料</span>
          </div>
          <div class="folder-doc-list">
            ${docs.map((location) => renderFolderDocItem(location)).join("")}
          </div>
        </section>`;
      })
      .join("");
  }

  function renderFolderDocItem(location) {
    const scan = state.folderScan?.[location.docId];
    const status = state.statuses[location.docId] || "pending";
    const templateCount = templatesForDocument(location.docId).length;
    return `<button class="folder-doc-item ${status}" type="button" data-folder-doc="${location.docId}">
      <span>
        <strong>${escapeHtml(location.name)}</strong>
        <small>${escapeHtml(location.template || "资料文件")} · ${templateCount} 个模板/官方表格 · ${escapeHtml(folderScanLabel(scan))}</small>
      </span>
      <em>${escapeHtml(documentStatusLabel(status))}</em>
    </button>`;
  }

  function folderScanLabel(scan) {
    if (!scan) return "尚未扫描";
    if (scan.status === "detected") return `检测到 ${scan.fileCount} 个文件`;
    return "未检测到文件";
  }

  function documentStatusLabel(status) {
    return {
      pending: "未开始",
      uploading: "待上传",
      detected: "已检测到文件",
      review: "需要复核",
      done: "已完成",
      not_applicable: "不适用"
    }[status] || "未开始";
  }

  function formMapping() {
    return window.VISA_FORM_FIELDS?.[state.destinationId];
  }

  function renderFormMapping() {
    const mapping = formMapping();
    if (!mapping) {
      els.formMapping.innerHTML = `<div class="form-brief">当前目的地还没有官网表格字段映射。</div>`;
      return;
    }

    const sections = mapping.sections
      .map((section) => {
        const rows = section.fields
          .map((field, fieldIndex) => {
            const fieldKey = formFieldKey(section, field, fieldIndex);
            const value = state.formFieldValues[fieldKey] || "";
            return `<tr>
              <td><div class="doc-name">${field.officialLabel}</div></td>
              <td>${field.zhLabel}</td>
              <td><div class="doc-note">${field.guidance}</div></td>
              <td>
                <textarea class="form-field-input" data-field-input="${fieldKey}" placeholder="我的填写内容">${escapeHtml(value)}</textarea>
              </td>
              <td>${field.source}</td>
            </tr>`;
          })
          .join("");

        return `<section class="form-section">
          <div class="form-section-header">
            <div>
              <h3>${section.name}</h3>
              <p>官网位置：${section.websiteStep}</p>
            </div>
            <div class="screenshot-slot">截图槽位：${section.screenshotSlot}</div>
          </div>
          <div class="table-wrap">
            <table class="form-fields-table">
              <thead>
                <tr>
                  <th>官网字段</th>
                  <th>中文含义</th>
                  <th>填写建议</th>
                  <th>我的填写内容</th>
                  <th>来源</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </section>`;
      })
      .join("");

    els.formMapping.innerHTML = `<div class="form-brief">
      <strong>官方入口：<a href="${mapping.officialEntry}" target="_blank" rel="noreferrer">${mapping.officialEntry}</a></strong>
      <span>表格类型：${mapping.formMode}。${mapping.caveat}</span>
      <span>填写内容只保存在当前浏览器本地，不会上传到官网或第三方。</span>
    </div>${sections}`;
  }

  function formFieldKey(section, field, fieldIndex) {
    return `${state.destinationId}::${section.name}::${fieldIndex}::${field.officialLabel}`;
  }

  function loadFormFieldValues() {
    try {
      return JSON.parse(localStorage.getItem("visaTool.formFieldValues") || "{}");
    } catch {
      return {};
    }
  }

  function saveFormFieldValues() {
    localStorage.setItem("visaTool.formFieldValues", JSON.stringify(state.formFieldValues));
  }

  function loadTimelineValues() {
    const fallback = {
      submissionDate: offsetDate(30),
      departureDate: offsetDate(45),
      needsStamp: true,
      needsTranslation: false,
      applicantName: ""
    };
    try {
      return { ...fallback, ...JSON.parse(localStorage.getItem("visaTool.timelineValues") || "{}") };
    } catch {
      return fallback;
    }
  }

  function saveTimelineValues() {
    localStorage.setItem("visaTool.timelineValues", JSON.stringify(state.timeline));
  }

  function offsetDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function syncTimelineInputs() {
    els.timelineSubmissionDate.value = state.timeline.submissionDate;
    els.timelineDepartureDate.value = state.timeline.departureDate;
    els.timelineStampToggle.checked = state.timeline.needsStamp;
    els.timelineTranslationToggle.checked = state.timeline.needsTranslation;
    els.watermarkApplicantName.value = state.timeline.applicantName;
  }

  function readTimelineInputs() {
    state.timeline = {
      submissionDate: els.timelineSubmissionDate.value,
      departureDate: els.timelineDepartureDate.value,
      needsStamp: els.timelineStampToggle.checked,
      needsTranslation: els.timelineTranslationToggle.checked,
      applicantName: els.watermarkApplicantName.value.trim()
    };
    saveTimelineValues();
  }

  function renderTimeline() {
    const documents = visibleDocuments().filter((doc) => doc.type !== "low_value");
    const plan = window.VISA_FLOW_ENGINE.buildTimeline({
      submissionDate: state.timeline.submissionDate,
      departureDate: state.timeline.departureDate,
      profile: state.profile,
      destination: destination(),
      documents
    });
    const extraItems = [];
    if (state.timeline.needsStamp) extraItems.push("需要盖章的材料优先联系公司、学校或邀请方。");
    if (state.timeline.needsTranslation) extraItems.push("预留翻译和格式复核时间。");
    els.timelineRows.innerHTML = plan.rows
      .map((row) => {
        const items = row.id === "work_finance" ? [...row.items, ...extraItems] : row.items;
        return `<tr>
          <td><span class="badge ${row.urgency}">${row.offsetLabel}</span></td>
          <td>${row.dueDate || "填写递签日期后生成"}</td>
          <td><div class="doc-name">${row.title}</div></td>
          <td><div class="doc-note">${items.map(escapeHtml).join("<br>")}</div></td>
        </tr>`;
      })
      .join("");
  }

  function defaultItineraryValues(destinationId) {
    const destinationDefaults = {
      "schengen-spain": [{ name: "马德里", nights: 2 }, { name: "巴塞罗那", nights: 2 }],
      "us-b1b2": [{ name: "纽约", nights: 3 }, { name: "洛杉矶", nights: 2 }],
      "uk-standard-visitor": [{ name: "伦敦", nights: 4 }],
      "canada-visitor": [{ name: "温哥华", nights: 2 }, { name: "多伦多", nights: 3 }],
      "australia-600": [{ name: "悉尼", nights: 3 }, { name: "墨尔本", nights: 2 }],
      "new-zealand-visitor": [{ name: "奥克兰", nights: 2 }, { name: "皇后镇", nights: 3 }],
      "japan-short": [{ name: "东京", nights: 3 }, { name: "大阪", nights: 2 }],
      "korea-c3": [{ name: "首尔", nights: 4 }],
      "vietnam-evisa": [{ name: "河内", nights: 2 }, { name: "胡志明市", nights: 2 }],
      "russia-evisa": [{ name: "莫斯科", nights: 3 }, { name: "圣彼得堡", nights: 2 }]
    };
    const citySegments = normalizeCitySegments(destinationDefaults[destinationId] || []);
    return {
      destinationId,
      startDate: "2026-10-01",
      originCity: "上海",
      returnCity: "上海",
      pace: "normal",
      inboundFlight: "",
      outboundFlight: "",
      citySegments,
      citiesText: serializeCitySegments(citySegments)
    };
  }

  function loadItineraryValues(destinationId = state.destinationId) {
    const fallback = defaultItineraryValues(destinationId);
    try {
      return normalizeItineraryValues({ ...fallback, ...JSON.parse(localStorage.getItem(`visaTool.itineraryValues.${destinationId}`) || "{}"), destinationId });
    } catch {
      return fallback;
    }
  }

  function saveItineraryValues() {
    localStorage.setItem(`visaTool.itineraryValues.${state.destinationId}`, JSON.stringify({ ...state.itinerary, destinationId: state.destinationId }));
  }

  function syncItineraryInputs() {
    els.itineraryStartDate.value = state.itinerary.startDate;
    els.itineraryOriginCity.value = state.itinerary.originCity;
    els.itineraryReturnCity.value = state.itinerary.returnCity;
    els.itineraryPace.value = state.itinerary.pace;
    els.itineraryInboundFlight.value = state.itinerary.inboundFlight;
    els.itineraryOutboundFlight.value = state.itinerary.outboundFlight;
    state.itinerary = normalizeItineraryValues(state.itinerary);
    els.itineraryCitiesInput.value = serializeCitySegments(state.itinerary.citySegments);
    syncItineraryCityControls();
  }

  function readItineraryInputs() {
    const citySegments = state.itinerary.citySegments?.length
      ? normalizeCitySegments(state.itinerary.citySegments)
      : parseItineraryCities(els.itineraryCitiesInput.value);
    state.itinerary = {
      destinationId: state.destinationId,
      startDate: els.itineraryStartDate.value,
      originCity: els.itineraryOriginCity.value.trim(),
      returnCity: els.itineraryReturnCity.value.trim(),
      pace: els.itineraryPace.value,
      inboundFlight: els.itineraryInboundFlight.value.trim(),
      outboundFlight: els.itineraryOutboundFlight.value.trim(),
      citySegments,
      citiesText: serializeCitySegments(citySegments)
    };
    els.itineraryCitiesInput.value = state.itinerary.citiesText;
    saveItineraryValues();
  }

  function parseItineraryCities(text) {
    return normalizeCitySegments(String(text || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.includes("|") ? line.split("|") : line.split(",");
        return {
          name: (parts[0] || "").trim(),
          nights: Number.parseInt((parts[1] || "").trim(), 10) || 0,
          hotel: (parts[2] || "").trim(),
          hotelAddress: (parts[3] || "").trim(),
          hotelVerified: ["true", "已核对", "yes"].includes((parts[4] || "").trim().toLowerCase())
        };
      }));
  }

  function normalizeItineraryValues(values) {
    const citySegments = normalizeCitySegments(
      values.citySegments?.length ? values.citySegments : parseItineraryCities(values.citiesText || "")
    ).map(clearGeneratedHotelPlaceholder);
    return {
      ...values,
      citySegments,
      citiesText: serializeCitySegments(citySegments)
    };
  }

  function normalizeCitySegments(segments) {
    return (segments || [])
      .map((segment) => ({
        name: String(segment.name || "").trim(),
        nights: Math.max(1, Number.parseInt(segment.nights, 10) || 1),
        hotel: String(segment.hotel || "").trim(),
        hotelAddress: String(segment.hotelAddress || "").trim(),
        hotelVerified: segment.hotelVerified === true || segment.hotelVerified === "true" || segment.hotelVerified === "已核对"
      }))
      .filter((segment) => segment.name);
  }

  function clearGeneratedHotelPlaceholder(segment) {
    if (!generatedHotelPlaceholders.has(`${segment.hotel}|${segment.hotelAddress}`)) return segment;
    return { ...segment, hotel: "", hotelAddress: "", hotelVerified: false };
  }

  function serializeCitySegments(segments) {
    return normalizeCitySegments(segments)
      .map((segment) => [
        segment.name,
        segment.nights,
        segment.hotel,
        segment.hotelAddress,
        segment.hotelVerified ? "已核对" : "待核对"
      ].join(" | "))
      .join("\n");
  }

  function cityOptionsForDestination(destinationId) {
    const options = {
      "schengen-spain": ["马德里", "巴塞罗那", "塞维利亚", "格拉纳达", "瓦伦西亚"],
      "us-b1b2": ["纽约", "洛杉矶", "旧金山", "拉斯维加斯", "华盛顿", "波士顿", "芝加哥", "西雅图"],
      "uk-standard-visitor": ["伦敦", "爱丁堡", "曼彻斯特", "牛津", "剑桥"],
      "canada-visitor": ["温哥华", "多伦多", "蒙特利尔", "渥太华", "卡尔加里"],
      "australia-600": ["悉尼", "墨尔本", "布里斯班", "黄金海岸", "堪培拉"],
      "new-zealand-visitor": ["奥克兰", "皇后镇", "基督城", "罗托鲁瓦", "惠灵顿"],
      "japan-short": ["东京", "大阪", "京都", "奈良", "福冈", "札幌"],
      "korea-c3": ["首尔", "釜山", "济州", "仁川"],
      "vietnam-evisa": ["河内", "胡志明市", "岘港", "会安"],
      "russia-evisa": ["莫斯科", "圣彼得堡", "喀山"]
    };
    return options[destinationId] || [];
  }

  function syncItineraryCityControls() {
    const options = cityOptionsForDestination(state.destinationId);
    els.itineraryCityOptions.innerHTML = options
      .map((city) => `<button class="city-chip" type="button" data-add-city="${escapeHtml(city)}">${escapeHtml(city)}</button>`)
      .join("");
    els.itineraryCityRows.innerHTML = state.itinerary.citySegments
      .map((segment, index) => renderItineraryCityRow(segment, index))
      .join("");
  }

  function renderItineraryCityRow(segment, index) {
    const mapHref = hotelMapUrl(segment);
    return `<div class="itinerary-city-row" data-city-row="${index}">
      <label>
        <span>城市</span>
        <input type="text" value="${escapeHtml(segment.name)}" data-city-index="${index}" data-city-field="name" />
      </label>
      <label>
        <span>晚数</span>
        <input type="number" min="1" value="${segment.nights}" data-city-index="${index}" data-city-field="nights" />
      </label>
      <label>
        <span>真实酒店名称</span>
        <input type="text" value="${escapeHtml(segment.hotel)}" placeholder="从酒店订单或地图复制" data-city-index="${index}" data-city-field="hotel" />
      </label>
      <label>
        <span>酒店地址</span>
        <input type="text" value="${escapeHtml(segment.hotelAddress)}" placeholder="填写完整地址，避免只写商圈" data-city-index="${index}" data-city-field="hotelAddress" />
      </label>
      <div class="city-row-actions">
        <a class="secondary-button map-link" href="${mapHref}" target="_blank" rel="noreferrer" data-map-hotel="${index}">地图核对</a>
        <label class="toggle-row compact">
          <input type="checkbox" ${segment.hotelVerified ? "checked" : ""} data-city-index="${index}" data-city-field="hotelVerified" />
          <span>已核对</span>
        </label>
        <button class="ghost-button danger" type="button" data-remove-city="${index}">删除</button>
      </div>
    </div>`;
  }

  function hotelMapUrl(segment) {
    const query = [segment.hotel, segment.hotelAddress, segment.name].filter(Boolean).join(" ") || `${segment.name} hotel`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  function addCityToItinerary(cityName) {
    const citySegments = normalizeCitySegments(state.itinerary.citySegments);
    const existing = citySegments.find((segment) => segment.name === cityName);
    if (existing) {
      existing.nights += 1;
    } else {
      citySegments.push({ name: cityName, nights: 1, hotel: "", hotelAddress: "", hotelVerified: false });
    }
    state.itinerary.citySegments = citySegments;
    state.itinerary.citiesText = serializeCitySegments(citySegments);
    els.itineraryCitiesInput.value = state.itinerary.citiesText;
    saveItineraryValues();
    syncItineraryCityControls();
    renderItinerary();
  }

  function updateCitySegment(index, field, value) {
    const citySegments = normalizeCitySegments(state.itinerary.citySegments);
    if (!citySegments[index]) return;
    if (field === "nights") {
      citySegments[index].nights = Math.max(1, Number.parseInt(value, 10) || 1);
    } else if (field === "hotelVerified") {
      citySegments[index].hotelVerified = Boolean(value);
    } else {
      citySegments[index][field] = String(value || "").trim();
      if (field === "hotel" || field === "hotelAddress") {
        citySegments[index].hotelVerified = false;
      }
    }
    state.itinerary.citySegments = normalizeCitySegments(citySegments);
    state.itinerary.citiesText = serializeCitySegments(state.itinerary.citySegments);
    els.itineraryCitiesInput.value = state.itinerary.citiesText;
    saveItineraryValues();
  }

  function removeCityFromItinerary(index) {
    const citySegments = normalizeCitySegments(state.itinerary.citySegments);
    citySegments.splice(index, 1);
    state.itinerary.citySegments = citySegments;
    state.itinerary.citiesText = serializeCitySegments(citySegments);
    els.itineraryCitiesInput.value = state.itinerary.citiesText;
    saveItineraryValues();
    syncItineraryCityControls();
    renderItinerary();
  }

  function focusFolderDoc(docId) {
    window.setTimeout(() => {
      const target = document.querySelector(`[data-folder-doc="${cssEscape(docId)}"]`);
      if (!target) return;
      target.scrollIntoView({ block: "center", behavior: "smooth" });
      target.classList.add("attention");
      window.setTimeout(() => target.classList.remove("attention"), 1400);
    }, 0);
  }

  function cssEscape(value) {
    if (window.CSS?.escape) return window.CSS.escape(value);
    return String(value).replace(/"/g, '\\"');
  }

  function applyFolderScanResults(scan) {
    state.folderScan = scan.byDocId || {};
    Object.entries(state.folderScan).forEach(([docId, result]) => {
      const current = state.statuses[docId] || "pending";
      if (result.status === "detected" && (current === "pending" || current === "uploading")) {
        state.statuses[docId] = "detected";
      }
      if (result.status === "missing" && current === "detected") {
        state.statuses[docId] = "review";
      }
    });
    saveActiveCase({ quiet: true });
    renderTable();
    renderInspector();
    renderFolders();
    renderFlow();
  }

  function currentItineraryPlan() {
    return window.VISA_ITINERARY_ENGINE.buildVisaItinerary(
      {
        destinationId: state.destinationId,
        startDate: state.itinerary.startDate,
        originCity: state.itinerary.originCity,
        returnCity: state.itinerary.returnCity,
        purpose: state.purpose,
        pace: state.itinerary.pace,
        inboundFlight: state.itinerary.inboundFlight,
        outboundFlight: state.itinerary.outboundFlight,
        cities: state.itinerary.citySegments || parseItineraryCities(state.itinerary.citiesText)
      },
      window.VISA_ITINERARY_RULES
    );
  }

  function renderItinerary() {
    const plan = currentItineraryPlan();
    els.itineraryChecks.innerHTML = plan.checks
      .map(
        (check) => `<div class="check-card ${check.status}">
          <strong>${check.label}</strong>
          <span>${check.message}</span>
        </div>`
      )
      .join("");
    els.itinerarySummary.innerHTML = `<div>
      <strong>${plan.summary.title}</strong>
      <span>${plan.summary.emphasis}</span>
    </div>
    <div>
      <span>路线：${plan.summary.route || "待填写"}</span>
      <span>${plan.summary.totalDays} 天 / ${plan.summary.totalNights} 晚</span>
      <span>主停留城市：${plan.summary.mainCity || "待判断"}</span>
      <span>${itineraryReliabilityNote}</span>
    </div>`;
    els.itineraryResult.innerHTML = plan.days
      .map(
        (day) => `<tr>
          <td>${day.date || "待定"}</td>
          <td>第 ${day.day} 天</td>
          <td>${escapeHtml(day.city || "待填写")}</td>
          <td><div class="doc-note">${escapeHtml(day.plan)}</div></td>
          <td>
            <div class="doc-name">${escapeHtml(day.hotel)}</div>
            <div class="doc-note">${escapeHtml(day.hotelAddress)}</div>
          </td>
          <td>${escapeHtml(day.flight || "-")}</td>
        </tr>`
      )
      .join("");
  }

  function renderWatermarkText() {
    const text = window.VISA_WATERMARK_ENGINE.buildWatermarkText({
      destinationName: destination().shortName,
      visaType: destination().visaType,
      applicantName: state.timeline.applicantName,
      date: new Date().toISOString().slice(0, 10)
    });
    els.watermarkText.value = text;
  }

  async function handleWatermarkFile(file) {
    clearWatermarkUrls();
    if (!file) {
      renderEmptyWatermarkPreview();
      return;
    }
    state.watermark.file = file;
    state.watermark.filename = file.name;
    state.watermark.mimeType = file.type;
    state.watermark.objectUrl = URL.createObjectURL(file);
    if (file.type.startsWith("image/")) {
      await renderWatermarkImage(file);
      return;
    }
    if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      renderWatermarkPdf();
      return;
    }
    els.watermarkPreview.innerHTML = `<span>暂不支持该文件类型。请上传图片或 PDF，文件只在本地处理，不会上传。</span>`;
  }

  function renderEmptyWatermarkPreview() {
    els.watermarkPreview.innerHTML = `<span>上传证件副本后在这里预览。图片可直接导出水印副本；PDF 第一版提供本地预览和打印保存。</span>`;
  }

  async function renderWatermarkImage(file) {
    const image = await loadImage(file);
    const canvas = document.createElement("canvas");
    const maxWidth = 1200;
    const ratio = Math.min(1, maxWidth / image.width);
    canvas.width = Math.round(image.width * ratio);
    canvas.height = Math.round(image.height * ratio);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    window.VISA_WATERMARK_ENGINE.drawRepeatedWatermark(ctx, canvas.width, canvas.height, els.watermarkText.value);
    state.watermark.renderedUrl = canvas.toDataURL("image/png");
    els.watermarkPreview.innerHTML = `<img src="${state.watermark.renderedUrl}" alt="本地水印预览" />`;
  }

  function renderWatermarkPdf() {
    els.watermarkPreview.innerHTML = `<div class="pdf-watermark-preview">
      <iframe src="${state.watermark.objectUrl}" title="PDF 本地预览"></iframe>
      <div class="pdf-watermark-overlay">${escapeHtml(els.watermarkText.value)}</div>
      <p>PDF 文件不会上传。第一版请使用浏览器打印/保存为 PDF；后续版本再加入真正的 PDF 写入导出。</p>
    </div>`;
  }

  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = URL.createObjectURL(file);
    });
  }

  function clearWatermarkUrls() {
    if (state.watermark.objectUrl) URL.revokeObjectURL(state.watermark.objectUrl);
    state.watermark = { file: null, objectUrl: "", renderedUrl: "", filename: "", mimeType: "" };
  }

  function exportWatermarkFile() {
    if (!state.watermark.file) {
      showToast("请先上传需要加水印的文件");
      return;
    }
    const purpose = `${destination().name}签证`;
    if (state.watermark.mimeType.startsWith("image/") && state.watermark.renderedUrl) {
      const a = document.createElement("a");
      a.href = state.watermark.renderedUrl;
      a.download = window.VISA_WATERMARK_ENGINE.safeWatermarkFilename(state.watermark.filename.replace(/\.[^.]+$/, ".png"), purpose);
      a.click();
      showToast("水印图片副本已导出");
      return;
    }
    if (state.watermark.mimeType === "application/pdf" || state.watermark.filename.toLowerCase().endsWith(".pdf")) {
      window.print();
      showToast("请在打印窗口选择保存为 PDF");
      return;
    }
    showToast("当前文件类型暂不支持导出");
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function renderSources() {
    const dest = destination();
    els.sourceList.innerHTML = dest.sources
      .map(
        (source) => `<div class="source-card">
          <strong>${source.title}</strong>
          <a href="${source.url}" target="_blank" rel="noreferrer">${source.url}</a>
          <div class="source-meta">
            <span>${source.authority === "official_government" ? "政府官方" : "官方签证中心"}</span>
            <span>最后核验：${source.lastChecked}</span>
            <span>下一次复核：${dest.nextReview}</span>
            <span class="badge ${source.confidence}">置信度：${source.confidence === "high" ? "高" : "中"}</span>
          </div>
        </div>`
      )
      .join("");
  }

  function renderIterations() {
    const dest = destination();
    els.iterationList.innerHTML = `<div class="iteration-card">
      <strong>${dest.name} 当前规则状态</strong>
      <p class="muted">${dest.notes}</p>
      <div class="iteration-meta">
        <span>数据版本：${data.version}</span>
        <span>最后核验：${dest.lastChecked}</span>
        <span>下一次复核：${dest.nextReview}</span>
        <span>置信度：${dest.confidence === "high" ? "高" : "中"}</span>
      </div>
    </div>` + data.iterations
      .map(
        (item) => `<div class="iteration-card">
          <strong>${item.version} ${item.title}</strong>
          <p class="muted">${item.detail}</p>
          <div class="iteration-meta"><span>${item.date}</span></div>
        </div>`
      )
      .join("");
  }

  function renderTabs() {
    document.querySelectorAll(".tab").forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === state.tab);
    });
    ["flow", "checklist", "forms", "itinerary", "folders", "sources", "iterations"].forEach((tab) => {
      document.getElementById(`${tab}Tab`).classList.toggle("hidden", state.tab !== tab);
    });
  }

  function render() {
    renderDestinations();
    renderCases();
    renderHeader();
    renderFlow();
    renderSummary();
    renderFilters();
    renderFolders();
    renderTable();
    renderInspector();
    renderFormMapping();
    renderItinerary();
    renderSources();
    renderIterations();
    renderTabs();
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("visible");
    window.setTimeout(() => els.toast.classList.remove("visible"), 1800);
  }

  function setDestination(id) {
    if (id === state.destinationId) return;
    saveActiveCase({ quiet: true });
    const matchingCase = findCaseForDestination(id);
    if (matchingCase) {
      if (!matchingCase.snapshot?.destinationId) {
        matchingCase.snapshot = resetDestinationScopedState(id);
        state.cases = state.cases.map((item) => (item.id === matchingCase.id ? matchingCase : item));
        window.VISA_CASE_STORE.saveCases(state.cases, matchingCase.id);
      }
      setActiveCase(matchingCase.id);
      showToast(`已切换到${matchingCase.name}`);
      return;
    }
    state.activeCaseId = "";
    state.destinationId = id;
    applyCaseSnapshot(resetDestinationScopedState(id));
    syncProfileInputs();
    syncTimelineInputs();
    syncItineraryInputs();
    render();
    showToast("已切换到未保存草稿。切换目的地不会自动新建案件，请点“新建”保存。");
  }

  document.addEventListener("click", (event) => {
    const destinationButton = event.target.closest("[data-destination]");
    const filterButton = event.target.closest("[data-filter]");
    const tabButton = event.target.closest("[data-tab]");
    const row = event.target.closest("[data-doc]");
    const inspectButton = event.target.closest("[data-inspect]");
    const flowAction = event.target.closest("[data-flow-action]");
    const deleteCaseButton = event.target.closest("[data-delete-case]");
    const caseButton = event.target.closest("[data-case]");
    const addCityButton = event.target.closest("[data-add-city]");
    const removeCityButton = event.target.closest("[data-remove-city]");
    const goFolderButton = event.target.closest("[data-go-folder]");
    const folderDocButton = event.target.closest("[data-folder-doc]");
    const downloadTemplateButton = event.target.closest("[data-download-template]");

    if (deleteCaseButton) {
      deleteCase(deleteCaseButton.dataset.deleteCase);
      return;
    }
    if (downloadTemplateButton) {
      downloadDocumentTemplate(downloadTemplateButton.dataset.templateDoc, downloadTemplateButton.dataset.downloadTemplate);
      return;
    }
    if (addCityButton) {
      addCityToItinerary(addCityButton.dataset.addCity);
      return;
    }
    if (removeCityButton) {
      removeCityFromItinerary(Number.parseInt(removeCityButton.dataset.removeCity, 10));
      return;
    }
    if (goFolderButton) {
      state.selectedDocId = goFolderButton.dataset.goFolder;
      state.tab = "folders";
      render();
      focusFolderDoc(state.selectedDocId);
      return;
    }
    if (folderDocButton) {
      state.selectedDocId = folderDocButton.dataset.folderDoc;
      state.tab = "checklist";
      render();
      return;
    }

    if (destinationButton) {
      setDestination(destinationButton.dataset.destination);
    }
    if (caseButton) {
      setActiveCase(caseButton.dataset.case);
    }
    if (filterButton) {
      state.filter = filterButton.dataset.filter;
      render();
    }
    if (tabButton) {
      state.tab = tabButton.dataset.tab;
      render();
    }
    if (row) {
      state.selectedDocId = row.dataset.doc;
      renderTable();
      renderInspector();
    }
    if (inspectButton) {
      state.selectedDocId = inspectButton.dataset.inspect;
      renderTable();
      renderInspector();
    }
    if (flowAction) {
      state.tab = flowAction.dataset.flowAction;
      render();
    }
  });

  document.addEventListener("input", (event) => {
    const fieldKey = event.target.dataset.fieldInput;
    if (fieldKey) {
      state.formFieldValues[fieldKey] = event.target.value;
      saveFormFieldValues();
      return;
    }
    const cityField = event.target.dataset.cityField;
    if (cityField && event.target.type !== "checkbox") {
      updateCitySegment(Number.parseInt(event.target.dataset.cityIndex, 10), cityField, event.target.value);
      renderItinerary();
      return;
    }
    if (
      event.target === els.itineraryStartDate ||
      event.target === els.itineraryOriginCity ||
      event.target === els.itineraryReturnCity ||
      event.target === els.itineraryInboundFlight ||
      event.target === els.itineraryOutboundFlight
    ) {
      readItineraryInputs();
      return;
    }
    if (event.target === els.itineraryCitiesInput) {
      state.itinerary.citySegments = parseItineraryCities(els.itineraryCitiesInput.value);
      readItineraryInputs();
      syncItineraryCityControls();
      renderItinerary();
      return;
    }
    if (
      event.target === els.timelineSubmissionDate ||
      event.target === els.timelineDepartureDate ||
      event.target === els.watermarkApplicantName
    ) {
      readTimelineInputs();
      renderFlow();
    }
  });

  document.addEventListener("change", (event) => {
    const statusDoc = event.target.dataset.statusDoc;
    if (statusDoc) {
      state.statuses[statusDoc] = event.target.value;
      showToast("资料状态已更新");
      return;
    }
    const cityField = event.target.dataset.cityField;
    if (cityField) {
      updateCitySegment(
        Number.parseInt(event.target.dataset.cityIndex, 10),
        cityField,
        event.target.type === "checkbox" ? event.target.checked : event.target.value
      );
      syncItineraryCityControls();
      renderItinerary();
      return;
    }
    if (event.target === els.itineraryPace || event.target === els.itineraryStartDate) {
      readItineraryInputs();
      renderItinerary();
      return;
    }
    if (
      event.target === els.timelineSubmissionDate ||
      event.target === els.timelineDepartureDate ||
      event.target === els.timelineStampToggle ||
      event.target === els.timelineTranslationToggle
    ) {
      readTimelineInputs();
      renderFlow();
      showToast("时间计划已更新");
      return;
    }
    if (event.target === els.watermarkFileInput) {
      handleWatermarkFile(event.target.files[0]);
      return;
    }
    state.profile = els.profileSelect.value;
    state.purpose = els.purposeSelect.value;
    state.party = els.partySelect.value;
    state.income = els.incomeSelect.value;
    state.invitation = els.invitationToggle.checked;
    state.jurisdiction = els.jurisdictionSelect.value;
    render();
  });

  document.getElementById("resetProfileButton").addEventListener("click", () => {
    state.profile = "employed";
    state.purpose = "tourism";
    state.party = "solo";
    state.income = "high";
    state.invitation = false;
    els.profileSelect.value = state.profile;
    els.purposeSelect.value = state.purpose;
    els.partySelect.value = state.party;
    els.incomeSelect.value = state.income;
    els.invitationToggle.checked = state.invitation;
    render();
    showToast("申请人画像已重置");
  });

  document.getElementById("folderButton").addEventListener("click", () => {
    state.tab = "folders";
    render();
  });

  document.getElementById("saveCaseButton").addEventListener("click", () => {
    saveActiveCase();
  });

  document.getElementById("nextFlowButton").addEventListener("click", () => {
    const steps = window.VISA_FLOW_ENGINE.buildFlowSteps({
      destination: destination(),
      documents: visibleDocuments(),
      statuses: state.statuses,
      hasFormMapping: Boolean(formMapping()),
      hasTimeline: Boolean(state.timeline.submissionDate),
      hasItinerary: Boolean(window.VISA_ITINERARY_RULES?.[state.destinationId])
    });
    const next = steps.find((step) => step.status !== "done") || steps[0];
    state.tab = next.tab;
    render();
  });

  document.getElementById("generateTimelineButton").addEventListener("click", () => {
    readTimelineInputs();
    renderFlow();
    showToast("时间计划表已生成");
  });

  document.getElementById("generateItineraryButton").addEventListener("click", () => {
    readItineraryInputs();
    renderItinerary();
    showToast("行程单已生成");
  });

  document.getElementById("nextDocButton").addEventListener("click", () => {
    const docs = filteredDocuments();
    const current = docs.findIndex((doc) => doc.id === state.selectedDocId);
    state.selectedDocId = docs[(current + 1) % docs.length]?.id || "";
    renderTable();
    renderInspector();
  });

  document.getElementById("copyMkdirButton").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(els.mkdirCommand.value);
      showToast("mkdir 命令已复制");
    } catch {
      els.mkdirCommand.select();
      showToast("已选中命令，可手动复制");
    }
  });

  document.getElementById("createFoldersButton").addEventListener("click", async () => {
    if (!window.VISA_FOLDER_ENGINE.canCreateLocalFolders(window)) {
      showToast("当前浏览器不支持直接创建，请下载脚本或复制命令");
      return;
    }
    try {
      const result = await window.VISA_FOLDER_ENGINE.createLocalFolders(state.folderPlan, window);
      showToast(`已创建 ${result.count} 个资料夹和 ${result.fileCount || 0} 个模板文件`);
    } catch (error) {
      showToast(error.name === "AbortError" ? "已取消选择目录" : "资料夹创建失败");
    }
  });

  document.getElementById("scanFoldersButton").addEventListener("click", async () => {
    if (!window.VISA_FOLDER_ENGINE.canCreateLocalFolders(window)) {
      showToast("当前浏览器不支持直接扫描，请先按资料夹结构手动核对");
      return;
    }
    try {
      const scan = await window.VISA_FOLDER_ENGINE.scanLocalFolders(state.folderPlan, window);
      applyFolderScanResults(scan);
      showToast(`扫描完成：${scan.summary.detected} 项检测到文件，${scan.summary.missing} 项待补充`);
    } catch (error) {
      showToast(error.name === "AbortError" ? "已取消选择目录" : "资料夹扫描失败");
    }
  });

  document.getElementById("downloadMkdirScriptButton").addEventListener("click", () => {
    const script = `#!/bin/zsh\nset -e\n${els.mkdirCommand.value}\n`;
    const blob = new Blob([script], { type: "text/x-shellscript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.folderPlan.root}-创建资料夹.command`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("创建资料夹脚本已下载");
  });

  document.getElementById("exportJsonButton").addEventListener("click", () => {
    const payload = {
      version: data.version,
      destination: destination(),
      profile: {
        profile: state.profile,
        purpose: state.purpose,
        party: state.party,
        jurisdiction: els.jurisdictionSelect.value,
        invitation: state.invitation
      },
      documents: visibleDocuments()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${destination().shortName}-签证资料清单-v${data.version}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("规则 JSON 已导出");
  });

  document.getElementById("exportFieldsButton").addEventListener("click", () => {
    const mapping = formMapping();
    if (!mapping) {
      showToast("当前目的地没有可导出的表格字段");
      return;
    }
    const lines = [["目的地", "章节", "官网位置", "截图槽位", "官网字段", "中文含义", "填写建议", "我的填写内容", "来源", "官方入口"]];
    mapping.sections.forEach((section) => {
      section.fields.forEach((field, fieldIndex) => {
        const fieldKey = formFieldKey(section, field, fieldIndex);
        lines.push([
          destination().name,
          section.name,
          section.websiteStep,
          section.screenshotSlot,
          field.officialLabel,
          field.zhLabel,
          field.guidance,
          state.formFieldValues[fieldKey] || "",
          field.source,
          mapping.officialEntry
        ]);
      });
    });
    const csv = lines.map((row) => row.map(csvCell).join(",")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${destination().shortName}-官网表格填写对照-v${data.version}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("字段对照 CSV 已导出");
  });

  document.getElementById("exportItineraryButton").addEventListener("click", () => {
    readItineraryInputs();
    const plan = currentItineraryPlan();
    if (plan.days.length === 0) {
      showToast("请先填写至少一个城市和晚数");
      return;
    }
    const blob = new Blob([`\uFEFF${plan.csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${destination().shortName}-签证行程单-v${data.version}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("行程单 CSV 已导出");
  });

  document.getElementById("exportWatermarkButton").addEventListener("click", () => {
    readTimelineInputs();
    renderWatermarkText();
    exportWatermarkFile();
  });

  function csvCell(value) {
    return `"${String(value).replaceAll('"', '""')}"`;
  }

  function downloadDocumentTemplate(docId, templateId) {
    const doc = visibleDocuments().find((item) => item.id === docId);
    const template = templatesForDocument(docId).find((item) => item.id === templateId);
    if (!doc || !template) {
      showToast("没有找到对应模板");
      return;
    }
    const filename = template.filename || `模板_${doc.name}.md`;
    const blob = new Blob([template.content || ""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast("模板已下载");
  }

  document.getElementById("reviewCycleButton").addEventListener("click", () => {
    state.tab = "iterations";
    render();
  });

  document.getElementById("newCaseButton").addEventListener("click", () => {
    createNewCase();
  });

  syncProfileInputs();
  syncTimelineInputs();
  syncItineraryInputs();
  render();
})();
