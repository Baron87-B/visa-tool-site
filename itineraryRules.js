window.VISA_ITINERARY_RULES = {
  "schengen-spain": {
    title: "申根行程单",
    emphasis: "住宿必须覆盖每一晚，入境/离境、保险、机票和主目的国逻辑要一致。",
    requiredChecks: ["accommodationCoverage", "flightCoverage", "dateContinuity", "mainDestination"],
    dayTemplates: [
      "市区核心景点参观，保留充足步行和用餐时间。",
      "博物馆、历史街区或周边短途游览。",
      "自由活动和购物，晚间返回酒店休息。"
    ]
  },
  "us-b1b2": {
    title: "美国备用行程摘要",
    emphasis: "美国面签通常不要求复杂行程单，但建议准备简洁、可信的访问摘要。",
    requiredChecks: ["flightCoverage", "dateContinuity"],
    dayTemplates: ["城市观光或探访安排。", "按访问目的安排活动，避免过度细碎。"]
  },
  "uk-standard-visitor": {
    title: "英国访客行程单",
    emphasis: "重点解释访问目的、停留时间、住宿和预算合理性。",
    requiredChecks: ["accommodationCoverage", "flightCoverage", "dateContinuity"],
    dayTemplates: ["城市观光和文化参观。", "周边短途或亲友拜访。", "自由活动并返回住宿。"]
  },
  "canada-visitor": {
    title: "加拿大访客行程单",
    emphasis: "行程应证明短期访问、资金能力和离境安排清晰。",
    requiredChecks: ["accommodationCoverage", "flightCoverage", "dateContinuity"],
    dayTemplates: ["城市观光或亲友拜访。", "周边自然景点或商务/家庭安排。"]
  },
  "australia-600": {
    title: "澳大利亚 600 行程单",
    emphasis: "重点体现真实短期访问、住宿连续和返程安排。",
    requiredChecks: ["accommodationCoverage", "flightCoverage", "dateContinuity"],
    dayTemplates: ["城市观光和海港/市区活动。", "周边一日游或亲友拜访。"]
  },
  "new-zealand-visitor": {
    title: "新西兰访客行程单",
    emphasis: "需说明资金、住宿、离境安排和合理旅行节奏。",
    requiredChecks: ["accommodationCoverage", "flightCoverage", "dateContinuity"],
    dayTemplates: ["城市观光和自然景点安排。", "周边短途游览，晚间返回住宿。"]
  },
  "japan-short": {
    title: "日本滞在予定表",
    emphasis: "日本材料常看每日城市、住宿、联系方式和停留计划是否清楚。",
    requiredChecks: ["accommodationCoverage", "flightCoverage", "dateContinuity"],
    dayTemplates: ["市区观光、商圈和餐饮安排。", "寺社、博物馆或周边短途游览。"]
  },
  "korea-c3": {
    title: "韩国短期访问行程单",
    emphasis: "短期行程可简洁，但住宿、入境日期和访问目的要对应。",
    requiredChecks: ["accommodationCoverage", "flightCoverage", "dateContinuity"],
    dayTemplates: ["市区观光和购物。", "历史文化景点或亲友拜访。"]
  },
  "vietnam-evisa": {
    title: "越南 eVisa 行程摘要",
    emphasis: "重点核对入境口岸、离境口岸、停留地址和日期。",
    requiredChecks: ["accommodationCoverage", "dateContinuity"],
    dayTemplates: ["城市观光和当地体验。", "周边短途活动。"]
  },
  "russia-evisa": {
    title: "俄罗斯 eVisa 行程摘要",
    emphasis: "重点核对电子签证允许停留期、城市路线、酒店和入离境安排。",
    requiredChecks: ["accommodationCoverage", "dateContinuity"],
    dayTemplates: ["市区核心景点参观。", "博物馆、历史街区或周边短途活动。"]
  }
};
