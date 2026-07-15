window.VISA_DATA = {
  version: "0.5.7",
  generatedAt: "2026-06-27",
  reviewPolicy: {
    p0: "申根、美国、英国、加拿大每周复核官方来源。",
    p1: "澳大利亚、新西兰、日本、韩国每两周复核。",
    p2: "eVisa 国家每月复核，用户生成清单当天做快速检查。"
  },
  iterations: [
    {
      version: "0.5.7",
      date: "2026-07-15",
      title: "真实行程与酒店核对",
      detail: "行程生成器不再自动编写酒店名称或地址，改为按目的地推荐城市、逐段填写真实酒店、打开地图核对并标记核对状态，降低虚假行程信息影响审核的风险。"
    },
    {
      version: "0.5.6",
      date: "2026-07-15",
      title: "目的地、案件与行程状态同步",
      detail: "修复选择目的地后我的案件仍停留在其他国家、行程草稿复用旧目的地的问题。行程缓存改为按目的地隔离，切换目的地会自动切换或创建对应案件。"
    },
    {
      version: "0.5.5",
      date: "2026-07-15",
      title: "案件删除",
      detail: "我的案件列表新增删除按钮，删除前确认，删除当前案件后自动切换到下一个案件，并至少保留一个本机案件。"
    },
    {
      version: "0.5.4",
      date: "2026-07-15",
      title: "Kiwi 打卡路线与循环动画",
      detail: "访问页 Kiwi 起飞动画改为循环播放，护照视觉升级为更明显的照片质感护照卡片，办理流程改成 Kiwi 到每个站点打卡。"
    },
    {
      version: "0.5.3",
      date: "2026-07-15",
      title: "Kiwi 进入动画",
      detail: "访问口令页新增原创 Kiwi 助跑起飞动画，让品牌口号和进入体验更有记忆点，并支持减少动态效果设置。"
    },
    {
      version: "0.5.2",
      date: "2026-07-15",
      title: "Kiwi 品牌口号",
      detail: "在访问页和工作台品牌区加入“不会飞的 Kiwi，也可以找到起飞的方法”和英文口号，明确从签证到行程的产品精神。"
    },
    {
      version: "0.5.1",
      date: "2026-07-15",
      title: "公开预览口令门",
      detail: "为公开发布出口增加访问口令页和退出访问按钮，便于持续迭代时进行轻量保护。"
    },
    {
      version: "0.5.0",
      date: "2026-07-12",
      title: "真实资料夹创建与案件保存",
      detail: "新增本地案件保存、选择案件恢复进度、浏览器本机资料夹创建，以及 mkdir 脚本下载兜底。"
    },
    {
      version: "0.4.0",
      date: "2026-06-29",
      title: "流程导览、时间计划与隐私水印",
      detail: "新增办理流程首页、递签时间倒排计划、证件副本本地水印工具，并记录长期产品定位。"
    },
    {
      version: "0.3.0",
      date: "2026-06-29",
      title: "签证行程单生成器",
      detail: "新增城市、晚数、酒店、航班输入，自动生成每日行程、住宿覆盖检查、航班检查和 CSV 导出。"
    },
    {
      version: "0.2.1",
      date: "2026-06-29",
      title: "可填写官网字段表",
      detail: "表格填写页新增“我的填写内容”输入列，自动保存在本机浏览器，并随 CSV 导出。"
    },
    {
      version: "0.2.0",
      date: "2026-06-28",
      title: "官网表格填写对照",
      detail: "新增 10 个目的地的官方表格字段映射、中文解释、填写建议、官方入口和截图槽位，并支持 CSV 导出。"
    },
    {
      version: "0.1.0",
      date: "2026-06-27",
      title: "第一版清单工作台",
      detail: "覆盖 10 个高频目的地，建立材料类别、适用画像、官方来源和资料夹结构。"
    },
    {
      version: "0.6.0",
      date: "计划中",
      title: "材料体检与风险提示",
      detail: "检查资料完整度、日期一致性、资金/工作材料合理性，并生成递签前风险提示。"
    }
  ],
  destinations: [
    {
      id: "schengen-spain",
      name: "西班牙申根",
      shortName: "西班牙",
      visaType: "申根 C 类短期旅游/探亲",
      group: "申根区",
      defaultJurisdiction: "上海领区",
      jurisdictions: ["北京领区", "上海领区", "广州领区", "成都领区", "沈阳领区", "武汉领区"],
      lastChecked: "2026-06-27",
      nextReview: "2026-07-04",
      confidence: "high",
      notes: "申根清单按欧盟通用要求加西班牙签证中心材料页面组织。不同领区可能有翻译、复印件和预约细节差异。",
      sources: [
        {
          title: "欧盟：申请申根签证",
          authority: "official_government",
          url: "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy/applying-schengen-visa_en",
          lastChecked: "2026-06-27",
          confidence: "high"
        },
        {
          title: "BLS Spain Visa China",
          authority: "official_vac",
          url: "https://china.blsspainvisa.com/",
          lastChecked: "2026-06-27",
          confidence: "medium"
        }
      ],
      documents: [
        "passport",
        "passport_copy",
        "application_form",
        "photo",
        "round_trip_booking",
        "accommodation",
        "travel_insurance",
        "itinerary",
        "bank_statement",
        "employment_letter",
        "business_license_copy",
        "student_certificate",
        "retirement_certificate",
        "minor_consent",
        "relationship_proof",
        "invitation_letter",
        "host_id_or_residence",
        "property_assets",
        "excessive_unofficial_docs"
      ]
    },
    {
      id: "us-b1b2",
      name: "美国 B1/B2",
      shortName: "美国",
      visaType: "B1/B2 商务/旅游",
      group: "北美",
      defaultJurisdiction: "北京领区",
      jurisdictions: ["北京领区", "上海领区", "广州领区", "沈阳领区", "武汉领区"],
      lastChecked: "2026-06-27",
      nextReview: "2026-07-04",
      confidence: "high",
      notes: "美国签证核心是 DS-160、缴费预约和面谈。支持材料不等于必交材料，面签时按情况携带。",
      sources: [
        {
          title: "Travel.State.Gov Visitor Visa",
          authority: "official_government",
          url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html",
          lastChecked: "2026-06-27",
          confidence: "high"
        },
        {
          title: "CEAC DS-160",
          authority: "official_government",
          url: "https://ceac.state.gov/genniv/",
          lastChecked: "2026-06-27",
          confidence: "high"
        }
      ],
      documents: [
        "passport",
        "ds160_confirmation",
        "appointment_confirmation",
        "photo_us",
        "employment_letter_support",
        "bank_statement_support",
        "itinerary_support",
        "invitation_letter",
        "business_invitation",
        "student_certificate",
        "retirement_certificate",
        "relationship_proof",
        "property_assets_support",
        "overpack_interview_docs"
      ]
    },
    {
      id: "uk-standard-visitor",
      name: "英国访客签",
      shortName: "英国",
      visaType: "Standard Visitor",
      group: "欧洲非申根",
      defaultJurisdiction: "中国大陆申请中心",
      jurisdictions: ["北京", "上海", "广州", "深圳", "成都", "武汉", "杭州", "南京", "重庆", "沈阳"],
      lastChecked: "2026-06-27",
      nextReview: "2026-07-04",
      confidence: "high",
      notes: "英国材料以上传系统和 GOV.UK 支持材料指南为准。需避免提交无关、无法解释的材料。",
      sources: [
        {
          title: "GOV.UK Standard Visitor Visa",
          authority: "official_government",
          url: "https://www.gov.uk/standard-visitor/apply-standard-visitor-visa",
          lastChecked: "2026-06-27",
          confidence: "high"
        },
        {
          title: "Visitor visa: supporting documents guide",
          authority: "official_government",
          url: "https://www.gov.uk/government/publications/visitor-visa-guide-to-supporting-documents",
          lastChecked: "2026-06-27",
          confidence: "high"
        }
      ],
      documents: [
        "passport",
        "uk_application_form",
        "appointment_confirmation",
        "bank_statement",
        "employment_letter",
        "business_license_copy",
        "student_certificate",
        "retirement_certificate",
        "itinerary",
        "accommodation",
        "invitation_letter",
        "host_id_or_residence",
        "relationship_proof",
        "translation",
        "property_assets",
        "excessive_unofficial_docs"
      ]
    },
    {
      id: "canada-visitor",
      name: "加拿大访客签",
      shortName: "加拿大",
      visaType: "Visitor Visa",
      group: "北美",
      defaultJurisdiction: "IRCC 在线申请",
      jurisdictions: ["IRCC 在线申请", "北京签证中心", "上海签证中心", "广州签证中心", "成都签证中心"],
      lastChecked: "2026-06-27",
      nextReview: "2026-07-04",
      confidence: "high",
      notes: "加拿大以 IRCC 在线系统生成的材料清单为准。生物识别采集和补料要求可能按个人情况变化。",
      sources: [
        {
          title: "IRCC Visit Canada",
          authority: "official_government",
          url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html",
          lastChecked: "2026-06-27",
          confidence: "high"
        },
        {
          title: "Apply for a visitor visa",
          authority: "official_government",
          url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html",
          lastChecked: "2026-06-27",
          confidence: "high"
        }
      ],
      documents: [
        "passport",
        "canada_forms",
        "photo",
        "bank_statement",
        "employment_letter",
        "business_license_copy",
        "student_certificate",
        "retirement_certificate",
        "itinerary",
        "accommodation",
        "invitation_letter",
        "host_id_or_residence",
        "relationship_proof",
        "biometrics_notice",
        "travel_history",
        "property_assets"
      ]
    },
    {
      id: "australia-600",
      name: "澳大利亚 600",
      shortName: "澳大利亚",
      visaType: "Visitor visa subclass 600",
      group: "大洋洲",
      defaultJurisdiction: "ImmiAccount 在线申请",
      jurisdictions: ["ImmiAccount 在线申请"],
      lastChecked: "2026-06-27",
      nextReview: "2026-07-11",
      confidence: "high",
      notes: "澳大利亚 600 以 ImmiAccount 和 Home Affairs 页面为准，可能要求补充体检或生物识别。",
      sources: [
        {
          title: "Home Affairs Visitor visa subclass 600",
          authority: "official_government",
          url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600/tourist-stream-overseas",
          lastChecked: "2026-06-27",
          confidence: "high"
        }
      ],
      documents: [
        "passport",
        "photo",
        "bank_statement",
        "employment_letter",
        "business_license_copy",
        "student_certificate",
        "retirement_certificate",
        "itinerary",
        "accommodation",
        "invitation_letter",
        "relationship_proof",
        "travel_history",
        "health_or_biometrics_notice",
        "property_assets"
      ]
    },
    {
      id: "new-zealand-visitor",
      name: "新西兰访客签",
      shortName: "新西兰",
      visaType: "Visitor Visa",
      group: "大洋洲",
      defaultJurisdiction: "INZ 在线申请",
      jurisdictions: ["INZ 在线申请"],
      lastChecked: "2026-06-27",
      nextReview: "2026-07-11",
      confidence: "high",
      notes: "新西兰重点证明真实短期访问、资金能力、离境安排和家庭/工作约束。",
      sources: [
        {
          title: "Immigration New Zealand Visitor Visa",
          authority: "official_government",
          url: "https://www.immigration.govt.nz/visas/visitor-visa/",
          lastChecked: "2026-06-27",
          confidence: "high"
        }
      ],
      documents: [
        "passport",
        "photo",
        "bank_statement",
        "employment_letter",
        "business_license_copy",
        "student_certificate",
        "retirement_certificate",
        "itinerary",
        "accommodation",
        "invitation_letter",
        "relationship_proof",
        "travel_history",
        "health_or_biometrics_notice",
        "property_assets"
      ]
    },
    {
      id: "japan-short",
      name: "日本短期旅游",
      shortName: "日本",
      visaType: "短期旅游/eVISA 资料准备",
      group: "东亚",
      defaultJurisdiction: "按使领馆领区",
      jurisdictions: ["北京领区", "上海领区", "广州领区", "沈阳领区", "重庆领区", "青岛领区", "香港领区"],
      lastChecked: "2026-06-27",
      nextReview: "2026-07-11",
      confidence: "medium",
      notes: "日本中国大陆旅游签通常涉及指定或认可机构提交。工具第一版定位为资料准备和交接清单，不宣传完全自助闭环。",
      sources: [
        {
          title: "Japan eVISA",
          authority: "official_government",
          url: "https://www.evisa.mofa.go.jp/index",
          lastChecked: "2026-06-27",
          confidence: "high"
        },
        {
          title: "日本国驻华大使馆签证信息",
          authority: "official_government",
          url: "https://www.cn.emb-japan.go.jp/itpr_zh/visa.html",
          lastChecked: "2026-06-27",
          confidence: "medium"
        }
      ],
      documents: [
        "passport",
        "application_form",
        "photo",
        "bank_statement",
        "employment_letter",
        "business_license_copy",
        "student_certificate",
        "retirement_certificate",
        "itinerary",
        "accommodation",
        "relationship_proof",
        "agent_submission_packet",
        "property_assets_support"
      ]
    },
    {
      id: "korea-c3",
      name: "韩国 C-3",
      shortName: "韩国",
      visaType: "C-3 短期访问",
      group: "东亚",
      defaultJurisdiction: "按使领馆领区",
      jurisdictions: ["北京领区", "上海领区", "广州领区", "青岛领区", "沈阳领区", "成都领区", "武汉领区", "西安领区"],
      lastChecked: "2026-06-27",
      nextReview: "2026-07-11",
      confidence: "medium",
      notes: "韩国材料按签证门户和驻华使领馆/签证中心页面核验，不同领区可能差异明显。",
      sources: [
        {
          title: "Korea Visa Portal",
          authority: "official_government",
          url: "https://www.visa.go.kr/openPage.do?MENU_ID=10102",
          lastChecked: "2026-06-27",
          confidence: "high"
        }
      ],
      documents: [
        "passport",
        "application_form",
        "photo",
        "bank_statement",
        "employment_letter",
        "business_license_copy",
        "student_certificate",
        "retirement_certificate",
        "itinerary",
        "accommodation",
        "invitation_letter",
        "relationship_proof",
        "property_assets_support"
      ]
    },
    {
      id: "vietnam-evisa",
      name: "越南 eVisa",
      shortName: "越南",
      visaType: "eVisa",
      group: "东南亚",
      defaultJurisdiction: "官方 eVisa 在线申请",
      jurisdictions: ["官方 eVisa 在线申请"],
      lastChecked: "2026-06-27",
      nextReview: "2026-07-27",
      confidence: "high",
      notes: "eVisa 流程较短，重点是护照信息、照片、入境口岸和支付确认。",
      sources: [
        {
          title: "Vietnam eVisa",
          authority: "official_government",
          url: "https://evisa.xuatnhapcanh.gov.vn/trang-chu-ttdt",
          lastChecked: "2026-06-27",
          confidence: "high"
        }
      ],
      documents: ["passport", "passport_bio_scan", "photo", "entry_exit_plan", "payment_receipt", "accommodation_support"]
    },
    {
      id: "russia-evisa",
      name: "俄罗斯 eVisa",
      shortName: "俄罗斯",
      visaType: "统一电子签证",
      group: "欧洲/亚洲",
      defaultJurisdiction: "官方 eVisa 在线申请",
      jurisdictions: ["官方 eVisa 在线申请"],
      lastChecked: "2026-06-27",
      nextReview: "2026-07-27",
      confidence: "high",
      notes: "俄罗斯电子签证以官方 eVisa 网站资格、停留期和口岸规则为准。",
      sources: [
        {
          title: "Russian Federation eVisa",
          authority: "official_government",
          url: "https://evisa.kdmid.ru/",
          lastChecked: "2026-06-27",
          confidence: "high"
        }
      ],
      documents: ["passport", "passport_bio_scan", "photo", "travel_insurance_support", "entry_exit_plan", "payment_receipt"]
    }
  ],
  documentRules: {
    passport: {
      name: "有效护照",
      category: "护照与个人资料",
      type: "required",
      summary: "护照有效期、空白页和签名页需满足目的地要求。",
      detail: "通常要求护照在预计离境或申请日后仍有足够有效期。申根常见要求为离开申根区后至少 3 个月有效，且有空白签证页。",
      appliesTo: "所有申请人",
      folder: "01_护照与身份",
      template: "护照首页扫描件"
    },
    passport_copy: {
      name: "护照资料页复印件",
      category: "护照与个人资料",
      type: "required",
      summary: "包含个人信息页及过往签证页复印件。",
      detail: "部分签证中心要求护照首页、签名页、旧护照和历史签证页复印件。",
      appliesTo: "申根递交材料",
      folder: "01_护照与身份",
      template: "护照复印件"
    },
    passport_bio_scan: {
      name: "护照信息页图片",
      category: "护照与个人资料",
      type: "required",
      summary: "用于 eVisa 在线上传或填写护照信息。",
      detail: "需保证护照号码、姓名、出生日期、有效期和机读码清晰。",
      appliesTo: "电子签证",
      folder: "01_护照与身份",
      template: "护照信息页 JPG"
    },
    application_form: {
      name: "签证申请表",
      category: "官方表格",
      type: "required",
      summary: "在线填写或下载填写后签名。",
      detail: "表格需与护照、行程、邀请和资金信息一致。未成年人通常由监护人签字。",
      appliesTo: "申根、日本、韩国等纸质/半线上流程",
      folder: "02_官方表格",
      template: "申请表 PDF"
    },
    uk_application_form: {
      name: "英国在线申请表",
      category: "官方表格",
      type: "required",
      summary: "在 GOV.UK 在线填写并提交。",
      detail: "提交后生成预约和上传材料流程。表格信息应与支持材料一致。",
      appliesTo: "英国 Standard Visitor",
      folder: "02_官方表格",
      template: "GOV.UK 申请表记录"
    },
    canada_forms: {
      name: "IRCC 在线表格与问卷",
      category: "官方表格",
      type: "required",
      summary: "通过 IRCC 账户生成个人化材料清单。",
      detail: "不同申请人回答会触发不同表格和支持材料，最终以 IRCC 账户清单为准。",
      appliesTo: "加拿大访客签",
      folder: "02_官方表格",
      template: "IRCC 表格与清单"
    },
    ds160_confirmation: {
      name: "DS-160 确认页",
      category: "官方表格",
      type: "required",
      summary: "美国非移民签证在线申请确认页。",
      detail: "面谈时需携带 DS-160 确认页。表格提交后如信息错误可能需要重新填写。",
      appliesTo: "美国 B1/B2",
      folder: "02_官方表格",
      template: "DS-160 确认页"
    },
    appointment_confirmation: {
      name: "预约确认页",
      category: "预约与回执",
      type: "required",
      summary: "签证中心、使馆或面签预约确认。",
      detail: "用于进入签证中心、录指纹或面谈。部分国家还需缴费收据。",
      appliesTo: "需要预约递交或面谈的流程",
      folder: "03_预约与回执",
      template: "预约确认"
    },
    biometrics_notice: {
      name: "生物识别通知信",
      category: "预约与回执",
      type: "conditional",
      summary: "IRCC 或签证系统要求采集生物识别时提供。",
      detail: "收到通知后按要求预约签证中心采集。",
      appliesTo: "加拿大等要求生物识别的申请人",
      folder: "03_预约与回执",
      template: "Biometrics Instruction Letter"
    },
    health_or_biometrics_notice: {
      name: "体检/生物识别补充通知",
      category: "预约与回执",
      type: "conditional",
      summary: "官方系统发出要求后再准备。",
      detail: "澳新等目的地可能按停留期、个人情况或系统要求触发体检、生物识别或补料。",
      appliesTo: "收到官方通知的申请人",
      folder: "03_预约与回执",
      template: "补充通知"
    },
    photo: {
      name: "签证照片",
      category: "护照与个人资料",
      type: "required",
      summary: "按目的地规格拍摄，常见为白底近照。",
      detail: "尺寸、背景、头部比例、是否露耳等要求按国家页面或签证中心页面执行。",
      appliesTo: "所有需要照片的申请",
      folder: "01_护照与身份",
      template: "签证照片"
    },
    photo_us: {
      name: "美国签证照片",
      category: "护照与个人资料",
      type: "required",
      summary: "DS-160 上传或面谈备用照片。",
      detail: "美国照片规格独立于多数国家，需按 Travel.State.Gov 照片要求准备。",
      appliesTo: "美国 B1/B2",
      folder: "01_护照与身份",
      template: "美国签证照片"
    },
    round_trip_booking: {
      name: "往返机票预订单",
      category: "行程与住宿",
      type: "required",
      summary: "显示申请人姓名、出入境日期和路线。",
      detail: "申根通常要求证明往返交通安排。第一版建议使用可取消预订，不建议在获签前购买不可退票。",
      appliesTo: "申根旅游/探亲",
      folder: "04_行程与住宿",
      template: "机票预订单"
    },
    accommodation: {
      name: "住宿证明",
      category: "行程与住宿",
      type: "required",
      summary: "酒店预订、住宿确认或接待方住宿说明。",
      detail: "如探亲访友，可能用邀请函和接待方住宿材料替代或补充。",
      appliesTo: "旅游或需说明停留地址的申请",
      folder: "04_行程与住宿",
      template: "酒店预订单"
    },
    accommodation_support: {
      name: "住宿信息",
      category: "行程与住宿",
      type: "supporting",
      summary: "用于电子签证填写或出行留存。",
      detail: "部分 eVisa 未必要求上传酒店文件，但通常需要填写停留地址。",
      appliesTo: "电子签证",
      folder: "04_行程与住宿",
      template: "住宿地址记录"
    },
    itinerary: {
      name: "行程计划",
      category: "行程与住宿",
      type: "supporting",
      summary: "按天列出城市、住宿、交通和主要活动。",
      detail: "复杂国家建议简洁、可解释，不需要过度精细到每小时。",
      appliesTo: "旅游申请",
      folder: "04_行程与住宿",
      template: "旅行计划单"
    },
    entry_exit_plan: {
      name: "入境/离境计划",
      category: "行程与住宿",
      type: "required",
      summary: "电子签证申请所需的预计日期、口岸、航班或路线。",
      detail: "口岸和停留期必须符合电子签证规则。",
      appliesTo: "电子签证",
      folder: "04_行程与住宿",
      template: "出入境计划"
    },
    travel_insurance: {
      name: "旅行医疗保险",
      category: "保险",
      type: "required",
      summary: "覆盖整个申根区和完整停留期。",
      detail: "申根常见要求医疗保险保额不低于 30,000 欧元，并覆盖紧急医疗和遣返。",
      appliesTo: "申根申请",
      folder: "05_保险",
      template: "旅行保险保单"
    },
    travel_insurance_support: {
      name: "旅行保险",
      category: "保险",
      type: "supporting",
      summary: "电子签证或入境备用材料。",
      detail: "是否必需按目的地规则确认。即使未强制，也建议出行时持有。",
      appliesTo: "部分电子签证或入境检查",
      folder: "05_保险",
      template: "旅行保险保单"
    },
    bank_statement: {
      name: "近 6 个月银行流水",
      category: "财务证明",
      type: "required",
      summary: "证明有能力承担旅行费用。",
      detail: "应能解释工资、收入、余额和旅行支出能力。大额临时转入需要合理说明。",
      appliesTo: "多数复杂签证申请",
      folder: "06_财务证明",
      template: "银行流水"
    },
    bank_statement_support: {
      name: "银行流水/资金证明",
      category: "财务证明",
      type: "supporting",
      summary: "用于面谈或证明旅行支付能力。",
      detail: "美国面签支持材料按签证官询问提供，不建议堆叠无关材料。",
      appliesTo: "美国等面谈型申请",
      folder: "06_财务证明",
      template: "银行流水"
    },
    employment_letter: {
      name: "在职证明",
      category: "工作/学业/退休",
      type: "conditional",
      summary: "说明职位、收入、入职时间、准假和公司信息。",
      detail: "通常需公司抬头纸、联系人、盖章或签字。适用于在职申请人。",
      appliesTo: "在职成人",
      folder: "07_工作学业退休",
      template: "在职证明模板"
    },
    employment_letter_support: {
      name: "在职证明",
      category: "工作/学业/退休",
      type: "supporting",
      summary: "用于证明国内约束和旅行目的。",
      detail: "面谈型签证建议携带，但是否查看取决于现场情况。",
      appliesTo: "在职成人",
      folder: "07_工作学业退休",
      template: "在职证明模板"
    },
    business_license_copy: {
      name: "营业执照副本复印件",
      category: "工作/学业/退休",
      type: "conditional",
      summary: "在职申请人常见公司资质辅助材料。",
      detail: "部分国家或签证中心要求加盖公章，具体按领区清单执行。",
      appliesTo: "在职成人",
      folder: "07_工作学业退休",
      template: "营业执照复印件"
    },
    student_certificate: {
      name: "在读证明/学生证",
      category: "工作/学业/退休",
      type: "conditional",
      summary: "学生申请人提供学籍和假期/准假证明。",
      detail: "未成年人还需监护人同意和关系证明。",
      appliesTo: "学生或未成年人",
      folder: "07_工作学业退休",
      template: "在读证明"
    },
    retirement_certificate: {
      name: "退休证明",
      category: "工作/学业/退休",
      type: "conditional",
      summary: "退休申请人证明身份和稳定收入来源。",
      detail: "可结合退休金流水、资产和家庭约束说明。",
      appliesTo: "退休人员",
      folder: "07_工作学业退休",
      template: "退休证"
    },
    minor_consent: {
      name: "未成年人监护人同意材料",
      category: "家庭与关系",
      type: "conditional",
      summary: "出生证明、亲属关系、父母同意书等。",
      detail: "如果父母一方或双方不同行，通常需要额外授权、身份证明或公证认证要求。",
      appliesTo: "未成年人",
      folder: "08_家庭与关系",
      template: "监护人同意书"
    },
    relationship_proof: {
      name: "关系证明",
      category: "家庭与关系",
      type: "conditional",
      summary: "户口本、结婚证、出生医学证明或亲属关系文件。",
      detail: "家庭同行、探亲访友、未成年人或由他人资助时通常需要。",
      appliesTo: "家庭同行、探亲访友、未成年人",
      folder: "08_家庭与关系",
      template: "关系证明"
    },
    invitation_letter: {
      name: "邀请函",
      category: "邀请/商务",
      type: "conditional",
      summary: "接待方说明邀请目的、时间、地点和承担事项。",
      detail: "探亲访友或商务访问时需要。旅游申请一般不需要。",
      appliesTo: "探亲访友或有邀请人",
      folder: "09_邀请与商务",
      template: "邀请函"
    },
    business_invitation: {
      name: "商务邀请/会议材料",
      category: "邀请/商务",
      type: "conditional",
      summary: "会议注册、商务邀请、展会或公司往来证明。",
      detail: "适用于商务/会议目的，材料需与行程和 DS-160/GOV.UK 等表格一致。",
      appliesTo: "商务/会议",
      folder: "09_邀请与商务",
      template: "商务邀请函"
    },
    host_id_or_residence: {
      name: "邀请人身份证明/居留证明",
      category: "邀请/商务",
      type: "conditional",
      summary: "邀请人在当地的身份证、护照、居留卡或住址证明。",
      detail: "探亲访友常见要求，具体取决于目的地和邀请人身份。",
      appliesTo: "探亲访友或有邀请人",
      folder: "09_邀请与商务",
      template: "邀请人身份证明"
    },
    travel_history: {
      name: "旅行历史",
      category: "补充说明",
      type: "supporting",
      summary: "过往签证、出入境记录和旅行记录。",
      detail: "用于解释旅行经验和遵守签证记录。无需提交无关或无法解释的材料。",
      appliesTo: "复杂签证支持材料",
      folder: "10_补充说明",
      template: "旅行历史"
    },
    translation: {
      name: "英文翻译件",
      category: "翻译与格式",
      type: "conditional",
      summary: "非英文材料按英国要求提供翻译。",
      detail: "翻译件需符合 GOV.UK 支持材料指南要求，包含译者确认信息。",
      appliesTo: "英国申请中的非英文材料",
      folder: "11_翻译与格式",
      template: "翻译件"
    },
    payment_receipt: {
      name: "支付回执",
      category: "预约与回执",
      type: "required",
      summary: "在线签证费支付后的确认或收据。",
      detail: "建议保存 PDF 和截图，避免系统查询失败时无凭证。",
      appliesTo: "电子签证或在线申请",
      folder: "03_预约与回执",
      template: "支付回执"
    },
    agent_submission_packet: {
      name: "代理/指定机构交接包",
      category: "代理交接",
      type: "conditional",
      summary: "用于日本等需要指定机构提交的资料交接。",
      detail: "包含申请表、护照、照片、行程、资金和机构要求的补充文件。具体以机构与使领馆页面为准。",
      appliesTo: "日本旅游签资料准备",
      folder: "12_代理交接",
      template: "交接清单"
    },
    property_assets: {
      name: "资产证明（如有）",
      category: "财务证明",
      type: "supporting",
      summary: "房产、车辆、理财等可作为补充约束材料。",
      detail: "不是所有申请都需要。提交前应确认是否能增强解释，避免无关材料增加审核噪音。",
      appliesTo: "资金或国内约束需要补充说明时",
      folder: "06_财务证明",
      template: "资产证明"
    },
    property_assets_support: {
      name: "资产证明（可选）",
      category: "财务证明",
      type: "supporting",
      summary: "作为资金和国内约束的补充。",
      detail: "优先保证核心材料完整，再决定是否提交资产证明。",
      appliesTo: "可选支持材料",
      folder: "06_财务证明",
      template: "资产证明"
    },
    excessive_unofficial_docs: {
      name: "无关材料堆叠",
      category: "低价值材料",
      type: "low_value",
      summary: "不建议提交无法解释或与申请目的无关的材料。",
      detail: "社媒攻略中常见的过度材料不等于官方要求。材料越多不一定越稳，关键是逻辑一致。",
      appliesTo: "所有申请",
      folder: "99_不建议提交",
      template: "不建议"
    },
    overpack_interview_docs: {
      name: "面签材料过度堆叠",
      category: "低价值材料",
      type: "low_value",
      summary: "美国面签不建议携带大量无关材料。",
      detail: "准备核心支持材料即可，回答和 DS-160 一致性更重要。",
      appliesTo: "美国面签",
      folder: "99_不建议提交",
      template: "不建议"
    }
  }
};

(function addPlanningMetadata(data) {
  const defaults = {
    leadTimeDays: 7,
    owner: "申请人",
    dependsOn: [],
    needsStamp: false,
    expiresBeforeSubmission: false
  };
  const overrides = {
    passport: { leadTimeDays: 30, owner: "申请人" },
    passport_copy: { leadTimeDays: 7, owner: "申请人" },
    passport_bio_scan: { leadTimeDays: 7, owner: "申请人" },
    application_form: { leadTimeDays: 7, owner: "申请人", dependsOn: ["passport", "itinerary"] },
    uk_application_form: { leadTimeDays: 7, owner: "申请人", dependsOn: ["passport", "itinerary"] },
    canada_forms: { leadTimeDays: 10, owner: "申请人", dependsOn: ["passport"] },
    ds160_confirmation: { leadTimeDays: 10, owner: "申请人", dependsOn: ["passport"] },
    appointment_confirmation: { leadTimeDays: 14, owner: "申请人", dependsOn: ["application_form"] },
    biometrics_notice: { leadTimeDays: 7, owner: "官方系统", dependsOn: ["appointment_confirmation"] },
    health_or_biometrics_notice: { leadTimeDays: 14, owner: "官方系统", dependsOn: ["appointment_confirmation"] },
    photo: { leadTimeDays: 7, owner: "申请人" },
    photo_us: { leadTimeDays: 7, owner: "申请人" },
    round_trip_booking: { leadTimeDays: 14, owner: "申请人", dependsOn: ["itinerary"], expiresBeforeSubmission: true },
    accommodation: { leadTimeDays: 14, owner: "申请人", dependsOn: ["itinerary"], expiresBeforeSubmission: true },
    accommodation_support: { leadTimeDays: 7, owner: "申请人", dependsOn: ["itinerary"] },
    itinerary: { leadTimeDays: 14, owner: "申请人", dependsOn: ["round_trip_booking", "accommodation"] },
    entry_exit_plan: { leadTimeDays: 7, owner: "申请人", dependsOn: ["passport"] },
    travel_insurance: { leadTimeDays: 14, owner: "申请人", dependsOn: ["itinerary"], expiresBeforeSubmission: true },
    travel_insurance_support: { leadTimeDays: 7, owner: "申请人", dependsOn: ["itinerary"] },
    bank_statement: { leadTimeDays: 21, owner: "银行/申请人", expiresBeforeSubmission: true },
    bank_statement_support: { leadTimeDays: 14, owner: "银行/申请人", expiresBeforeSubmission: true },
    employment_letter: { leadTimeDays: 21, owner: "公司 HR/申请人", needsStamp: true },
    employment_letter_support: { leadTimeDays: 14, owner: "公司 HR/申请人", needsStamp: true },
    business_license_copy: { leadTimeDays: 21, owner: "公司行政/申请人", needsStamp: true },
    student_certificate: { leadTimeDays: 14, owner: "学校/申请人", needsStamp: true },
    retirement_certificate: { leadTimeDays: 7, owner: "申请人" },
    minor_consent: { leadTimeDays: 21, owner: "监护人/公证处", needsStamp: true },
    relationship_proof: { leadTimeDays: 14, owner: "申请人/户籍机构" },
    invitation_letter: { leadTimeDays: 21, owner: "邀请人/接待方" },
    business_invitation: { leadTimeDays: 21, owner: "邀请公司/会议方", needsStamp: true },
    host_id_or_residence: { leadTimeDays: 14, owner: "邀请人/接待方" },
    travel_history: { leadTimeDays: 7, owner: "申请人" },
    translation: { leadTimeDays: 14, owner: "翻译方/申请人" },
    payment_receipt: { leadTimeDays: 3, owner: "申请人" },
    agent_submission_packet: { leadTimeDays: 14, owner: "申请人/代理机构" },
    property_assets: { leadTimeDays: 14, owner: "申请人/银行/登记机构" },
    property_assets_support: { leadTimeDays: 14, owner: "申请人/银行/登记机构" },
    excessive_unofficial_docs: { leadTimeDays: 0, owner: "不建议准备" },
    overpack_interview_docs: { leadTimeDays: 0, owner: "不建议准备" }
  };

  Object.entries(data.documentRules).forEach(([id, rule]) => {
    Object.assign(rule, defaults, overrides[id] || {});
  });
})(window.VISA_DATA);
