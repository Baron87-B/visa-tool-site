(function (root) {
  const DAY_MS = 24 * 60 * 60 * 1000;

  function buildFlowSteps({ destination, documents, statuses, hasFormMapping, hasTimeline, hasItinerary, timelineTaskStatuses = {}, timelineRows = [] }) {
    const requiredDocs = documents.filter((doc) => doc.type === "required" || doc.type === "conditional");
    const doneDocs = requiredDocs.filter((doc) => statuses[doc.id] === "done");
    const checklistStatus = doneDocs.length === 0 ? "in_progress" : doneDocs.length === requiredDocs.length ? "done" : "in_progress";
    const timelineStatus = linkedTimelineStatus({ hasTimeline, timelineTaskStatuses, timelineRows });

    return [
      step("destination", "选择签证类型", "确认目的地、签证类型和受理领区。", "已选择", "done", "progress", 1, 0),
      step("profile", "填写申请人画像", "身份、目的、同行和邀请情况会影响材料清单。", "调整画像", "done", "progress", 1, 0),
      step("checklist", "查看资料清单", `当前需重点处理 ${requiredDocs.length} 项必需/条件材料。`, "查看材料", checklistStatus, "materials", 1, requiredDocs.length),
      step("timeline", "生成时间计划", "按递签日期倒排公司盖章、银行流水、酒店保险和最终复核。", "生成计划", timelineStatus, "progress", 1, 0),
      step("documents", "准备/上传资料", "逐项收集文件并标记状态，优先处理需要第三方配合的材料。", "整理资料", doneDocs.length > 0 ? "in_progress" : "waiting", "materials", 7, requiredDocs.length),
      step("forms", "填写官网表格", hasFormMapping ? "先在中文对照表里写好答案，再转填官网。" : "当前目的地暂无表格字段映射。", "填写表格", hasFormMapping ? "ready" : "waiting", "fill", 1, 0),
      step("itinerary", "生成行程单", "让酒店、航班、保险、主目的地和表格日期互相一致。", "生成行程", hasItinerary ? "ready" : "waiting", "fill", 1, 0),
      step("watermark", "水印与导出", "给证件副本添加用途水印，只处理副本，不覆盖原文件。", "添加水印", "ready", "review", 1, 0),
      step("finalReview", "递签前复核", `按 ${destination.name} 当前官方来源做最终检查。`, "最终复核", "waiting", "review", 1, 0)
    ];
  }

  function linkedTimelineStatus({ hasTimeline, timelineTaskStatuses, timelineRows }) {
    if (!hasTimeline) return "waiting";
    const rowIds = timelineRows.length ? timelineRows.map((row) => row.id) : ["strategy", "work_finance", "travel", "forms", "final"];
    const statuses = rowIds.map((id) => timelineTaskStatuses[id] || "waiting");
    if (statuses.length && statuses.every((status) => status === "done")) return "done";
    if (statuses.some((status) => status === "done" || status === "in_progress")) return "in_progress";
    return "ready";
  }

  function step(id, title, goal, actionLabel, status, tab, estimatedDays, requiredDocs) {
    return { id, title, goal, actionLabel, status, tab, estimatedDays, requiredDocs };
  }

  function buildTimeline({ submissionDate, departureDate, profile, destination, documents, taskStatuses = {} }) {
    const submission = parseDate(submissionDate);
    const rows = [
      {
        id: "strategy",
        offsetDays: 30,
        title: "确认签证类型和预约策略",
        items: [`确认${destination.name}申请路径`, "核对护照有效期、空白页和受理领区", "确认是否需要提前预约或抢号"]
      },
      {
        id: "work_finance",
        offsetDays: 21,
        title: "准备工作、学业和资金材料",
        items: financeAndWorkItems(profile, documents)
      },
      {
        id: "travel",
        offsetDays: 14,
        title: "确认行程、住宿、保险和交通",
        items: travelItems(documents)
      },
      {
        id: "forms",
        offsetDays: 7,
        title: "填写官网表格并做一致性检查",
        items: ["转填官网表格", "核对姓名、护照号、日期、酒店和资金信息", "保存确认页、预约页或申请记录"]
      },
      {
        id: "final",
        offsetDays: 2,
        title: "打印、排序、水印和递签前复核",
        items: ["给证件副本添加用途水印", "按资料夹顺序打印和排序", "检查原件、复印件、预约确认和支付回执"]
      }
    ];

    return {
      submissionDate: submissionDate || "",
      departureDate: departureDate || "",
      rows: rows.map((row) => ({
        ...row,
        offsetLabel: `T-${row.offsetDays}`,
        dueDate: submission ? formatDate(addDays(submission, -row.offsetDays)) : "",
        urgency: row.offsetDays >= 21 ? "early" : row.offsetDays >= 7 ? "normal" : "final",
        status: taskStatuses[row.id] || "waiting"
      }))
    };
  }

  function financeAndWorkItems(profile, documents) {
    const names = new Set(documents.map((doc) => doc.id));
    const items = ["准备近 6 个月银行流水，检查工资、余额和大额转入解释"];
    if (profile === "employed" && (names.has("employment_letter") || names.has("employment_letter_support"))) {
      items.push("在职证明：预留公司盖章和负责人签字时间");
    }
    if (profile === "employed" && names.has("business_license_copy")) {
      items.push("营业执照副本复印件：确认是否需要公司盖章");
    }
    if (profile === "student" || names.has("student_certificate")) items.push("在读证明/学生证：向学校预留开具时间");
    if (profile === "retired" || names.has("retirement_certificate")) items.push("退休证明和退休金流水：准备原件和复印件");
    return items;
  }

  function travelItems(documents) {
    const byId = new Map(documents.map((doc) => [doc.id, doc]));
    const ids = ["round_trip_booking", "accommodation", "travel_insurance", "itinerary", "entry_exit_plan"];
    const items = ids.filter((id) => byId.has(id)).map((id) => `${byId.get(id).name}：确认日期覆盖并与申请表一致`);
    return items.length > 0 ? items : ["确认停留地址、入境日期和离境安排"];
  }

  function parseDate(value) {
    if (!value) return null;
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function addDays(date, days) {
    return new Date(date.getTime() + days * DAY_MS);
  }

  function formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  root.VISA_FLOW_ENGINE = { buildFlowSteps, buildTimeline };
})(typeof window !== "undefined" ? window : globalThis);
