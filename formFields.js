window.VISA_FORM_FIELDS = {
  "schengen-spain": {
    officialEntry: "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy/applying-schengen-visa_en",
    formMode: "downloadable_pdf_or_vac_upload",
    caveat: "申根统一申请表字段较稳定，但西班牙中国签证中心可能追加领区材料和预约字段。",
    sections: [
      { name: "个人身份信息", websiteStep: "Uniform Schengen Visa Application Form / Personal data", screenshotSlot: "forms/screenshots/schengen-spain/01-personal-data.png", fields: [
        { officialLabel: "Surname (Family name)", zhLabel: "姓", guidance: "按护照英文姓填写，必须和护照机读区一致。", source: "EU Schengen application form" },
        { officialLabel: "First name(s)", zhLabel: "名", guidance: "按护照英文名填写；多个名按护照顺序。", source: "EU Schengen application form" },
        { officialLabel: "Date / place / country of birth", zhLabel: "出生日期、出生地、出生国家", guidance: "日期按表格格式；出生地通常按护照或户口信息英文转写。", source: "EU Schengen application form" },
        { officialLabel: "Current nationality / nationality at birth", zhLabel: "现国籍/出生时国籍", guidance: "中国大陆普通护照通常填写 China / Chinese。", source: "EU Schengen application form" },
        { officialLabel: "Sex / Civil status", zhLabel: "性别/婚姻状况", guidance: "与护照、结婚证等材料保持一致。", source: "EU Schengen application form" }
      ] },
      { name: "护照与居住信息", websiteStep: "Travel document and residence data", screenshotSlot: "forms/screenshots/schengen-spain/02-passport-residence.png", fields: [
        { officialLabel: "Type of travel document", zhLabel: "旅行证件类型", guidance: "普通护照选 Ordinary passport。", source: "EU Schengen application form" },
        { officialLabel: "Number of travel document", zhLabel: "护照号码", guidance: "逐位核对，避免 O/0、I/1 混淆。", source: "EU Schengen application form" },
        { officialLabel: "Date of issue / expiry / issued by", zhLabel: "签发日期、有效期、签发机关", guidance: "完全照护照资料页填写。", source: "EU Schengen application form" },
        { officialLabel: "Home address and email / telephone", zhLabel: "住址、邮箱、电话", guidance: "建议与在职证明、银行流水地址逻辑一致。", source: "EU Schengen application form" }
      ] },
      { name: "行程与费用", websiteStep: "Travel purpose, destination, host and cost coverage", screenshotSlot: "forms/screenshots/schengen-spain/03-travel-cost.png", fields: [
        { officialLabel: "Purpose(s) of the journey", zhLabel: "旅行目的", guidance: "旅游选 Tourism；探亲访友选 Visit family or friends；商务选 Business。", source: "EU Schengen application form" },
        { officialLabel: "Member State of main destination / first entry", zhLabel: "主要目的国/首次入境国", guidance: "按停留夜数和实际入境口岸填写。", source: "EU Schengen application form" },
        { officialLabel: "Intended date of arrival/departure", zhLabel: "预计入境/离境日期", guidance: "与机票、酒店、保险覆盖日期一致。", source: "EU Schengen application form" },
        { officialLabel: "Inviting person / hotel / temporary address", zhLabel: "邀请人/酒店/停留地址", guidance: "旅游填酒店；探亲访友填邀请人和地址。", source: "EU Schengen application form" },
        { officialLabel: "Cost of travelling and living is covered by", zhLabel: "旅行费用承担人", guidance: "自费、公司、邀请人承担要和资金材料一致。", source: "EU Schengen application form" }
      ] }
    ]
  },
  "us-b1b2": {
    officialEntry: "https://ceac.state.gov/genniv/",
    formMode: "online_session",
    caveat: "DS-160 是会话型在线表格，部分页面有验证码和安全问题。本工具只做字段预填表和截图指引，不绕过 CEAC 验证。",
    sections: [
      { name: "开始申请", websiteStep: "DS-160 / Getting Started", screenshotSlot: "forms/screenshots/us-b1b2/01-getting-started.png", fields: [
        { officialLabel: "Select a location where you will be applying", zhLabel: "申请地点", guidance: "选择实际面谈/递签所在使领馆城市。", source: "CEAC DS-160" },
        { officialLabel: "Application ID", zhLabel: "申请编号", guidance: "系统生成后立刻保存，后续找回申请需要。", source: "CEAC DS-160" },
        { officialLabel: "Security question", zhLabel: "安全问题", guidance: "选择后记录答案，但不要存入共享文件。", source: "CEAC DS-160" }
      ] },
      { name: "个人、护照和联系方式", websiteStep: "Personal / Address and Phone / Passport", screenshotSlot: "forms/screenshots/us-b1b2/02-personal-passport-contact.png", fields: [
        { officialLabel: "Full Name in Native Alphabet", zhLabel: "中文姓名", guidance: "按中文证件姓名填写。", source: "CEAC DS-160" },
        { officialLabel: "National Identification Number", zhLabel: "身份证号", guidance: "中国大陆申请人通常填写居民身份证号码。", source: "CEAC DS-160" },
        { officialLabel: "Passport/Travel Document Number", zhLabel: "护照号码", guidance: "照护照填写，提交前逐位核对。", source: "CEAC DS-160" },
        { officialLabel: "Social Media Provider/Identifier", zhLabel: "社交媒体账号", guidance: "按系统列出的过去使用平台如实填写。", source: "CEAC DS-160" }
      ] },
      { name: "旅行、同行和美国联系人", websiteStep: "Travel / Travel Companions / U.S. Contact", screenshotSlot: "forms/screenshots/us-b1b2/03-travel-contact.png", fields: [
        { officialLabel: "Purpose of Trip to the U.S.", zhLabel: "赴美目的", guidance: "旅游/探亲通常选择 B2，商务会议选 B1 或 B1/B2。", source: "CEAC DS-160" },
        { officialLabel: "Intended Date of Arrival / Length of Stay", zhLabel: "预计抵达日期/停留时间", guidance: "与行程计划一致；不确定也要合理估计。", source: "CEAC DS-160" },
        { officialLabel: "Person/Entity Paying for Your Trip", zhLabel: "旅行费用承担人", guidance: "自费、父母、公司等要与资金材料和身份一致。", source: "CEAC DS-160" },
        { officialLabel: "Contact Person or Organization in the United States", zhLabel: "美国联系人/机构", guidance: "旅游可填酒店；探亲访友填邀请人；商务填公司或会议方。", source: "CEAC DS-160" }
      ] },
      { name: "家庭、工作教育和安全问题", websiteStep: "Family / Work-Education-Training / Security and Background", screenshotSlot: "forms/screenshots/us-b1b2/04-family-work-security.png", fields: [
        { officialLabel: "Present Work/Education/Training Information", zhLabel: "当前工作/学习信息", guidance: "与在职证明、学校证明、收入信息一致。", source: "CEAC DS-160" },
        { officialLabel: "Immediate relatives in the U.S.", zhLabel: "美国直系亲属", guidance: "如实填写，不要因为担心拒签而漏填。", source: "CEAC DS-160" },
        { officialLabel: "Security and Background questions", zhLabel: "安全背景问题", guidance: "逐项如实回答；任何 Yes 都需要准备解释。", source: "CEAC DS-160" },
        { officialLabel: "Sign and Submit", zhLabel: "电子签名提交", guidance: "提交前逐页复核；提交后生成确认页。", source: "CEAC DS-160" }
      ] }
    ]
  },
  "uk-standard-visitor": {
    officialEntry: "https://www.gov.uk/standard-visitor/apply-standard-visitor-visa",
    formMode: "online_session",
    caveat: "英国在线表格会按答案动态调整问题。本表是填写前字段准备，不替代 GOV.UK 最终问题。",
    sections: [
      { name: "账户、护照和个人信息", websiteStep: "GOV.UK application / Personal information", screenshotSlot: "forms/screenshots/uk-standard-visitor/01-personal-passport.png", fields: [
        { officialLabel: "Passport or travel document", zhLabel: "护照信息", guidance: "按护照填写姓名、号码、签发和有效期。", source: "GOV.UK Standard Visitor" },
        { officialLabel: "Your name / other names", zhLabel: "姓名/曾用名", guidance: "英文名与护照一致，曾用名如实填写。", source: "GOV.UK Standard Visitor" },
        { officialLabel: "Address / telephone / email", zhLabel: "地址、电话、邮箱", guidance: "邮箱用于接收申请和预约信息，需长期可访问。", source: "GOV.UK Standard Visitor" }
      ] },
      { name: "旅行目的和在英安排", websiteStep: "Visit details / Travel plan", screenshotSlot: "forms/screenshots/uk-standard-visitor/02-visit-plan.png", fields: [
        { officialLabel: "Reason for visit", zhLabel: "访问原因", guidance: "旅游、探亲访友、商务会议分别选择对应目的。", source: "GOV.UK Standard Visitor" },
        { officialLabel: "Date you plan to arrive / leave", zhLabel: "计划抵达/离开日期", guidance: "与机票、住宿和准假逻辑一致。", source: "GOV.UK Standard Visitor" },
        { officialLabel: "Where you will stay in the UK", zhLabel: "在英住宿地址", guidance: "酒店、亲友地址或临时安排需能解释。", source: "GOV.UK Standard Visitor" }
      ] },
      { name: "工作收入、费用和历史记录", websiteStep: "Employment / Income and expenditure / Travel history", screenshotSlot: "forms/screenshots/uk-standard-visitor/03-finance-history.png", fields: [
        { officialLabel: "Employment status", zhLabel: "就业状态", guidance: "在职、自由职业、学生、退休等按实际选择。", source: "GOV.UK Standard Visitor" },
        { officialLabel: "Monthly income after tax", zhLabel: "税后月收入", guidance: "与工资流水和在职证明一致。", source: "GOV.UK Standard Visitor" },
        { officialLabel: "How much money are you planning to spend", zhLabel: "预计花费", guidance: "需要与旅行天数、住宿、交通和收入匹配。", source: "GOV.UK Standard Visitor" },
        { officialLabel: "Travel history", zhLabel: "旅行历史", guidance: "按系统要求填写近年旅行和拒签/遣返记录。", source: "GOV.UK Standard Visitor" }
      ] }
    ]
  },
  "canada-visitor": {
    officialEntry: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html",
    formMode: "online_questionnaire_and_pdf_forms",
    caveat: "IRCC 会按问卷生成个人化材料清单；IMM 表格字段可提前准备。",
    sections: [
      { name: "IRCC 问卷和访问目的", websiteStep: "IRCC account / Questionnaire", screenshotSlot: "forms/screenshots/canada-visitor/01-questionnaire.png", fields: [
        { officialLabel: "What would you like to do in Canada?", zhLabel: "访问加拿大目的", guidance: "旅游、探亲、商务按真实目的选择。", source: "IRCC visitor visa application" },
        { officialLabel: "How long are you planning to stay?", zhLabel: "计划停留时间", guidance: "与行程、邀请和资金能力一致。", source: "IRCC visitor visa application" }
      ] },
      { name: "IMM 5257 个人和护照信息", websiteStep: "IMM 5257 / Personal details and passport", screenshotSlot: "forms/screenshots/canada-visitor/02-imm5257-personal.png", fields: [
        { officialLabel: "UCI", zhLabel: "客户识别号", guidance: "首次申请通常可留空；曾申请过加拿大签证则查历史文件。", source: "IRCC IMM 5257" },
        { officialLabel: "Full name / other names", zhLabel: "姓名/曾用名", guidance: "按护照和历史申请一致填写。", source: "IRCC IMM 5257" },
        { officialLabel: "Passport number / issue / expiry", zhLabel: "护照号码、签发、有效期", guidance: "逐位核对护照资料页。", source: "IRCC IMM 5257" }
      ] },
      { name: "访问详情、教育就业和背景", websiteStep: "IMM 5257 / Visit, education, employment, background", screenshotSlot: "forms/screenshots/canada-visitor/03-visit-background.png", fields: [
        { officialLabel: "Purpose of my visit", zhLabel: "访问目的", guidance: "与邀请函、行程和资金说明一致。", source: "IRCC IMM 5257" },
        { officialLabel: "Education / Employment", zhLabel: "教育/就业经历", guidance: "与在职证明、营业执照、流水逻辑一致。", source: "IRCC IMM 5257" },
        { officialLabel: "Background information", zhLabel: "背景问题", guidance: "拒签、犯罪、健康等问题必须如实回答。", source: "IRCC IMM 5257" }
      ] }
    ]
  },
  "australia-600": {
    officialEntry: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600/tourist-stream-overseas",
    formMode: "online_session",
    caveat: "ImmiAccount 表格会动态调整问题；纸质 1419 字段可作为预填参考。",
    sections: [
      { name: "申请人和护照", websiteStep: "ImmiAccount / Applicant and passport details", screenshotSlot: "forms/screenshots/australia-600/01-applicant-passport.png", fields: [
        { officialLabel: "Applicant details", zhLabel: "申请人信息", guidance: "姓名、出生日期、性别按护照填写。", source: "Home Affairs Visitor 600" },
        { officialLabel: "Passport details", zhLabel: "护照信息", guidance: "护照号码、签发国、签发和有效期需准确。", source: "Home Affairs Visitor 600" },
        { officialLabel: "National identity card", zhLabel: "身份证信息", guidance: "中国大陆申请人通常填写居民身份证。", source: "Home Affairs Visitor 600" }
      ] },
      { name: "旅行、资金和联系人", websiteStep: "Travel details / Funding / Contacts", screenshotSlot: "forms/screenshots/australia-600/02-travel-funding.png", fields: [
        { officialLabel: "Proposed travel dates", zhLabel: "计划旅行日期", guidance: "与行程和请假安排一致。", source: "Home Affairs Visitor 600" },
        { officialLabel: "Purpose of stay", zhLabel: "停留目的", guidance: "旅游、探亲或商务访问按真实目的选择。", source: "Home Affairs Visitor 600" },
        { officialLabel: "Funding for stay", zhLabel: "旅行资金", guidance: "说明自费、亲属资助或公司承担，并配套材料。", source: "Home Affairs Visitor 600" }
      ] },
      { name: "健康、品格和声明", websiteStep: "Health / Character / Declarations", screenshotSlot: "forms/screenshots/australia-600/03-health-character.png", fields: [
        { officialLabel: "Health declarations", zhLabel: "健康声明", guidance: "按实际健康和停留情况填写，可能触发体检。", source: "Home Affairs Visitor 600" },
        { officialLabel: "Character declarations", zhLabel: "品格声明", guidance: "犯罪、签证违规、服役等问题如实填写。", source: "Home Affairs Visitor 600" }
      ] }
    ]
  },
  "new-zealand-visitor": {
    officialEntry: "https://www.immigration.govt.nz/visas/visitor-visa/",
    formMode: "online_session",
    caveat: "INZ 在线问题会按停留期、访问目的和家庭情况变化。",
    sections: [
      { name: "身份、护照和联系方式", websiteStep: "INZ online / Identity and contact", screenshotSlot: "forms/screenshots/new-zealand-visitor/01-identity-contact.png", fields: [
        { officialLabel: "Identity details", zhLabel: "身份信息", guidance: "按护照填写姓名、出生日期和国籍。", source: "INZ Visitor Visa" },
        { officialLabel: "Passport details", zhLabel: "护照信息", guidance: "确保护照有效期覆盖计划停留。", source: "INZ Visitor Visa" },
        { officialLabel: "Contact details", zhLabel: "联系方式", guidance: "邮箱和电话用于接收补料或结果通知。", source: "INZ Visitor Visa" }
      ] },
      { name: "访问计划和资金", websiteStep: "Visit details / Funds", screenshotSlot: "forms/screenshots/new-zealand-visitor/02-visit-funds.png", fields: [
        { officialLabel: "Reason for travel", zhLabel: "旅行原因", guidance: "旅游、探亲、商务按实际选择。", source: "INZ Visitor Visa" },
        { officialLabel: "Intended arrival and departure", zhLabel: "预计入境和离境", guidance: "与机票、住宿和假期安排一致。", source: "INZ Visitor Visa" },
        { officialLabel: "Funds or sponsorship", zhLabel: "资金或担保", guidance: "自费提供资金；由他人承担需担保/邀请说明。", source: "INZ Visitor Visa" }
      ] },
      { name: "健康和品格", websiteStep: "Health and character", screenshotSlot: "forms/screenshots/new-zealand-visitor/03-health-character.png", fields: [
        { officialLabel: "Health questions", zhLabel: "健康问题", guidance: "按系统问题如实回答，可能触发体检。", source: "INZ Visitor Visa" },
        { officialLabel: "Character questions", zhLabel: "品格问题", guidance: "拒签、犯罪、遣返等历史需披露。", source: "INZ Visitor Visa" }
      ] }
    ]
  },
  "japan-short": {
    officialEntry: "https://www.evisa.mofa.go.jp/index",
    formMode: "downloadable_pdf_or_accredited_agency",
    caveat: "日本大陆旅游签常涉及指定/认可机构提交；本表用于资料准备和交接，不宣称完全自助提交。",
    sections: [
      { name: "申请表基本信息", websiteStep: "Visa application form to enter Japan / Basic information", screenshotSlot: "forms/screenshots/japan-short/01-basic-info.png", fields: [
        { officialLabel: "Surname / Given and middle names", zhLabel: "姓/名", guidance: "按护照英文填写。", source: "MOFA Japan visa application form" },
        { officialLabel: "Date and place of birth", zhLabel: "出生日期和地点", guidance: "与护照和户口信息一致。", source: "MOFA Japan visa application form" },
        { officialLabel: "Passport type / number / issue / expiry", zhLabel: "护照类型、号码、签发、有效期", guidance: "普通护照按 Ordinary 填写。", source: "MOFA Japan visa application form" }
      ] },
      { name: "赴日行程和住宿", websiteStep: "Travel information and hotel/inviter", screenshotSlot: "forms/screenshots/japan-short/02-travel-stay.png", fields: [
        { officialLabel: "Purpose of visit to Japan", zhLabel: "赴日目的", guidance: "旅游、探亲、商务按实际填写。", source: "MOFA Japan visa application form" },
        { officialLabel: "Intended length of stay", zhLabel: "预计停留天数", guidance: "与行程单和酒店订单一致。", source: "MOFA Japan visa application form" },
        { officialLabel: "Name and address of hotels or persons to stay with", zhLabel: "酒店或接待方", guidance: "旅游填酒店；探亲访友填接待人。", source: "MOFA Japan visa application form" }
      ] },
      { name: "职业、邀请人和问题项", websiteStep: "Employment / Guarantor or inviter / Questions", screenshotSlot: "forms/screenshots/japan-short/03-employment-inviter.png", fields: [
        { officialLabel: "Current profession or occupation and position", zhLabel: "当前职业和职位", guidance: "与在职证明一致。", source: "MOFA Japan visa application form" },
        { officialLabel: "Guarantor or reference in Japan", zhLabel: "在日保证人/联系人", guidance: "旅游无邀请人时按机构要求处理。", source: "MOFA Japan visa application form" },
        { officialLabel: "Remarks / criminal record questions", zhLabel: "备注/背景问题", guidance: "如实回答，异常情况需准备解释。", source: "MOFA Japan visa application form" }
      ] }
    ]
  },
  "korea-c3": {
    officialEntry: "https://www.visa.go.kr/openPage.do?MENU_ID=10102",
    formMode: "downloadable_pdf_or_portal",
    caveat: "韩国不同领区材料可能差异大，字段表以 Korea Visa Portal 和领区表格为基础。",
    sections: [
      { name: "个人和护照信息", websiteStep: "Visa application form / Personal and passport information", screenshotSlot: "forms/screenshots/korea-c3/01-personal-passport.png", fields: [
        { officialLabel: "Full name in English / Chinese characters", zhLabel: "英文姓名/汉字姓名", guidance: "英文按护照，汉字按中文证件。", source: "Korea Visa Portal" },
        { officialLabel: "Passport number / type / issue / expiry", zhLabel: "护照号码、类型、签发、有效期", guidance: "普通护照按 Regular/Ordinary 类别填写。", source: "Korea Visa Portal" },
        { officialLabel: "Contact information", zhLabel: "联系方式", guidance: "填写可联系的手机号、邮箱和住址。", source: "Korea Visa Portal" }
      ] },
      { name: "访问和邀请信息", websiteStep: "Details of visit / Inviter", screenshotSlot: "forms/screenshots/korea-c3/02-visit-inviter.png", fields: [
        { officialLabel: "Purpose of visit", zhLabel: "访问目的", guidance: "旅游、探亲、商务按实际选择 C-3 对应目的。", source: "Korea Visa Portal" },
        { officialLabel: "Intended period of stay", zhLabel: "预计停留期", guidance: "与机票酒店和行程一致。", source: "Korea Visa Portal" },
        { officialLabel: "Address in Korea", zhLabel: "韩国停留地址", guidance: "酒店或邀请人地址需完整。", source: "Korea Visa Portal" }
      ] },
      { name: "学历、职业和费用", websiteStep: "Education / Employment / Funding", screenshotSlot: "forms/screenshots/korea-c3/03-work-funding.png", fields: [
        { officialLabel: "Education", zhLabel: "教育程度", guidance: "按最高学历填写。", source: "Korea Visa Portal" },
        { officialLabel: "Employment", zhLabel: "就业信息", guidance: "与在职证明或营业材料一致。", source: "Korea Visa Portal" },
        { officialLabel: "Who will pay for your travel expenses?", zhLabel: "旅行费用承担人", guidance: "自费或他人承担需对应资金证明。", source: "Korea Visa Portal" }
      ] }
    ]
  },
  "vietnam-evisa": {
    officialEntry: "https://evisa.xuatnhapcanh.gov.vn/trang-chu-ttdt",
    formMode: "online_session",
    caveat: "越南 eVisa 字段较短，但照片、护照信息和口岸必须准确。",
    sections: [
      { name: "上传图片和个人信息", websiteStep: "Vietnam eVisa / Foreigner information", screenshotSlot: "forms/screenshots/vietnam-evisa/01-personal-upload.png", fields: [
        { officialLabel: "Portrait photography", zhLabel: "证件照", guidance: "按官网尺寸和背景要求上传。", source: "Vietnam eVisa" },
        { officialLabel: "Passport data page image", zhLabel: "护照资料页图片", guidance: "确保护照号码和机读码清晰。", source: "Vietnam eVisa" },
        { officialLabel: "Full name / sex / date of birth / nationality", zhLabel: "姓名、性别、出生日期、国籍", guidance: "与护照完全一致。", source: "Vietnam eVisa" }
      ] },
      { name: "行程和联系方式", websiteStep: "Trip information / Contact", screenshotSlot: "forms/screenshots/vietnam-evisa/02-trip-contact.png", fields: [
        { officialLabel: "Intended date of entry / exit", zhLabel: "预计入境/离境日期", guidance: "必须在电子签证有效规则内。", source: "Vietnam eVisa" },
        { officialLabel: "Allowed to entry through checkpoint", zhLabel: "入境口岸", guidance: "选择实际入境口岸，口岸错误可能影响入境。", source: "Vietnam eVisa" },
        { officialLabel: "Residential address / email", zhLabel: "住址/邮箱", guidance: "邮箱用于接收申请状态或结果。", source: "Vietnam eVisa" }
      ] }
    ]
  },
  "russia-evisa": {
    officialEntry: "https://evisa.kdmid.ru/",
    formMode: "online_session",
    caveat: "俄罗斯电子签证字段按官方在线系统为准，停留天数、入境口岸和照片规格需重点核对。",
    sections: [
      { name: "签证类型和个人信息", websiteStep: "Russian eVisa / Nationality, purpose and personal data", screenshotSlot: "forms/screenshots/russia-evisa/01-personal-purpose.png", fields: [
        { officialLabel: "Nationality", zhLabel: "国籍", guidance: "按护照国籍填写。", source: "Russian Federation eVisa" },
        { officialLabel: "Purpose of visit", zhLabel: "访问目的", guidance: "旅游、商务、人道等按实际选择。", source: "Russian Federation eVisa" },
        { officialLabel: "Surname / given names / sex / date of birth", zhLabel: "姓名、性别、出生日期", guidance: "与护照一致。", source: "Russian Federation eVisa" }
      ] },
      { name: "旅行、住宿和背景", websiteStep: "Trip details / Contacts / Background", screenshotSlot: "forms/screenshots/russia-evisa/02-trip-background.png", fields: [
        { officialLabel: "Planned route and stay", zhLabel: "计划路线和停留", guidance: "填写城市、住宿和预计日期。", source: "Russian Federation eVisa" },
        { officialLabel: "Host organization or hotel", zhLabel: "接待机构或酒店", guidance: "旅游通常填写酒店信息。", source: "Russian Federation eVisa" },
        { officialLabel: "Previous visits / security questions", zhLabel: "过往访问/安全问题", guidance: "如实回答历史访问和背景问题。", source: "Russian Federation eVisa" },
        { officialLabel: "Digital photo", zhLabel: "电子照片", guidance: "按官网照片规格上传。", source: "Russian Federation eVisa" }
      ] }
    ]
  }
};
