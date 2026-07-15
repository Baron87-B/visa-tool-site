(function (root) {
  const DAY_MS = 24 * 60 * 60 * 1000;

  function buildVisaItinerary(input, rulesMap) {
    const rules = rulesMap[input.destinationId] || {
      title: "签证行程单",
      emphasis: "保持日期、住宿、交通和访问目的互相一致。",
      requiredChecks: ["accommodationCoverage", "flightCoverage", "dateContinuity"],
      dayTemplates: ["城市观光和自由活动。"]
    };
    const cities = normalizeCities(input.cities);
    const startDate = parseDate(input.startDate);
    const totalNights = cities.reduce((sum, city) => sum + city.nights, 0);
    const days = [];

    for (let offset = 0; offset <= totalNights; offset += 1) {
      const segment = cityForOffset(cities, offset);
      const isArrival = offset === 0;
      const isDeparture = offset === totalNights;
      const date = startDate ? formatDate(addDays(startDate, offset)) : "";
      const plan = buildDayPlan({
        rules,
        input,
        segment,
        offset,
        isArrival,
        isDeparture
      });

      days.push({
        day: offset + 1,
        date,
        city: segment?.name || "",
        plan,
        hotel: isDeparture ? "离境日不住宿" : segment?.hotel || "待补充酒店",
        hotelAddress: isDeparture ? "" : segment?.hotelAddress || "待补充酒店地址",
        flight: isArrival ? input.inboundFlight : isDeparture ? input.outboundFlight : ""
      });
    }

    const summary = {
      title: rules.title,
      emphasis: rules.emphasis,
      totalNights,
      totalDays: days.length,
      mainCity: mainCity(cities),
      route: cities.map((city) => city.name).join(" → ")
    };
    const checks = buildChecks(input, cities, summary, rules);
    const csv = itineraryToCsv(days, summary, checks);

    return { days, summary, checks, csv };
  }

  function normalizeCities(cities) {
    return (cities || [])
      .map((city) => ({
        name: String(city.name || "").trim(),
        nights: Math.max(0, Number.parseInt(city.nights, 10) || 0),
        hotel: String(city.hotel || "").trim(),
        hotelAddress: String(city.hotelAddress || "").trim()
      }))
      .filter((city) => city.name && city.nights > 0);
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

  function cityForOffset(cities, offset) {
    if (cities.length === 0) return null;
    let cursor = 0;
    for (const city of cities) {
      if (offset < cursor + city.nights) return city;
      cursor += city.nights;
    }
    return cities[cities.length - 1];
  }

  function buildDayPlan({ rules, input, segment, offset, isArrival, isDeparture }) {
    const city = segment?.name || "目的地";
    if (isArrival) {
      const flight = input.inboundFlight ? `航班：${input.inboundFlight}。` : "";
      return `${input.originCity || "出发地"}出发，抵达${city}。${flight}办理入住，安排轻量市区活动。`;
    }
    if (isDeparture) {
      const flight = input.outboundFlight ? `航班：${input.outboundFlight}。` : "";
      return `从${city}出发返回${input.returnCity || "出发地"}。${flight}整理退房和离境材料。`;
    }
    const template = rules.dayTemplates[(offset - 1) % rules.dayTemplates.length] || "城市观光和自由活动。";
    const paceText = { relaxed: "节奏轻松，", normal: "", compact: "节奏紧凑，" }[input.pace] || "";
    return `${city}：${paceText}${template}`;
  }

  function mainCity(cities) {
    if (cities.length === 0) return "";
    return [...cities].sort((a, b) => b.nights - a.nights)[0].name;
  }

  function buildChecks(input, cities, summary, rules) {
    const checks = [];
    if (rules.requiredChecks.includes("accommodationCoverage")) {
      const missing = cities.filter((city) => !city.hotel || !city.hotelAddress);
      checks.push({
        id: "accommodationCoverage",
        label: "住宿覆盖",
        status: missing.length === 0 ? "pass" : "warn",
        message: missing.length === 0 ? "每一段城市停留都有酒店名称和地址。" : `缺少住宿信息：${missing.map((city) => city.name).join("、")}`
      });
    }
    if (rules.requiredChecks.includes("flightCoverage")) {
      checks.push({
        id: "flightCoverage",
        label: "航班覆盖",
        status: input.inboundFlight && input.outboundFlight ? "pass" : "warn",
        message: input.inboundFlight && input.outboundFlight ? "入境和离境航班信息已填写。" : "建议补充入境和离境航班信息。"
      });
    }
    if (rules.requiredChecks.includes("dateContinuity")) {
      checks.push({
        id: "dateContinuity",
        label: "日期连续",
        status: input.startDate && summary.totalNights > 0 ? "pass" : "warn",
        message: input.startDate && summary.totalNights > 0 ? `生成 ${summary.totalDays} 天 / ${summary.totalNights} 晚连续行程。` : "需要填写出发日期和至少一个城市晚数。"
      });
    }
    if (rules.requiredChecks.includes("mainDestination")) {
      checks.push({
        id: "mainDestination",
        label: "主目的地",
        status: summary.mainCity ? "pass" : "warn",
        message: summary.mainCity ? `停留最长城市：${summary.mainCity}。申根申请时需确认主目的国与递签国家一致。` : "无法判断主目的地。"
      });
    }
    return checks;
  }

  function itineraryToCsv(days, summary, checks) {
    const rows = [
      ["标题", summary.title],
      ["路线", summary.route],
      ["总天数", summary.totalDays],
      ["总晚数", summary.totalNights],
      [],
      ["日期", "天数", "城市", "行程安排", "酒店", "酒店地址", "航班"],
      ...days.map((day) => [day.date, day.day, day.city, day.plan, day.hotel, day.hotelAddress, day.flight]),
      [],
      ["检查项", "状态", "说明"],
      ...checks.map((check) => [check.label, check.status, check.message])
    ];
    return rows.map((row) => row.map(csvCell).join(",")).join("\n");
  }

  function csvCell(value) {
    return `"${String(value ?? "").replaceAll('"', '""')}"`;
  }

  root.VISA_ITINERARY_ENGINE = { buildVisaItinerary, normalizeCities };
})(typeof window !== "undefined" ? window : globalThis);
