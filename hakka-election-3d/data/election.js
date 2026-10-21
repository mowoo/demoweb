/* 選戰資料：選票數、候選人、客家政策。2026-10-21 依客戶 Google 文件「縣市長候選人」（22 縣市完整版）套入選舉人數（2022 年資料）、候選人姓名／黨籍／年紀／現職與部分客家政策。
   鍵值 = 縣市名（「台」寫法，與 hakka.js 一致）。
   votes   : 選舉人數（整數）；null 顯示「待補」
   photo   : 候選人照片路徑（客戶提供，已裁成 640×640 JPG：assets/cand/姓名.jpg）；尚無照片者暫用示意人像 placeholder-a.png 並標 photoPlaceholder
   photoPlaceholder: true 時卡片顯示「示意」標記，換成正式插畫後刪掉此欄位
   color   : 候選人備用色——有黨籍者畫面改用 app.js 的 PARTY_COLOR 政黨色系（2026-10-19），此欄只在無黨籍或未列政黨時使用
   age     : 整數；null 顯示「待補」
   bio     : 重要經歷，3 條以內
   policy  : 客家政策，字串（一句）或陣列（多條要點）；policyNote 為補充說明（如「2022 年所提」）
   link    : 專訪新聞網址（另開新頁）；未填時先連到客新聞首頁
   got     : 候選人縣市得票數（整數）；未填時畫面以 999,999 佔位（目前尚無統計）
   results : 鄉鎮得票數，{ 鄉鎮名: [依 candidates 順序的得票數] }；未填時畫面以 999,999 佔位 */
window.ELECTION = {
 "基隆市": {
  "votes": 307913,
  "candidates": [
   {
    "name": "謝國樑",
    "party": "中國國民黨",
    "age": 51,
    "role": "基隆市長",
    "color": "#1d4fa3",
    "photo": "assets/cand/謝國樑.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "童子瑋",
    "party": "民主進步黨",
    "age": 39,
    "role": "基隆市議長",
    "color": "#1b9431",
    "photo": "assets/cand/童子瑋.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "台北市": {
  "votes": 2026769,
  "candidates": [
   {
    "name": "蔣萬安",
    "party": "中國國民黨",
    "age": 47,
    "role": "台北市長",
    "color": "#1d4fa3",
    "photo": "assets/cand/蔣萬安.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "沈伯洋",
    "party": "民主進步黨",
    "age": 44,
    "role": "立法委員",
    "color": "#1b9431",
    "photo": "assets/cand/沈伯洋.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "新北市": {
  "votes": 3316517,
  "candidates": [
   {
    "name": "李四川",
    "party": "中國國民黨",
    "age": 68,
    "role": "國民黨新北市長候選人",
    "color": "#1d4fa3",
    "photo": "assets/cand/李四川.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "蘇巧慧",
    "party": "民主進步黨",
    "age": 50,
    "role": "立法委員",
    "color": "#1b9431",
    "photo": "assets/cand/蘇巧慧.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "桃園市": {
  "votes": 1825127,
  "candidates": [
   {
    "name": "張善政",
    "party": "中國國民黨",
    "age": 72,
    "role": "桃園市長",
    "color": "#1d4fa3",
    "photo": "assets/cand/張善政.jpg",
    "bio": [],
    "policy": [
     "全球新客都",
     "扎根客語教育",
     "科技助力客家文創",
     "客家文化永續發展"
    ],
    "policyNote": "（2022 年所提）",
    "link": null
   },
   {
    "name": "黃世杰",
    "party": "民主進步黨",
    "age": 47,
    "role": "民進黨桃園市長候選人",
    "color": "#1b9431",
    "photo": "assets/cand/黃世杰.jpg",
    "bio": [],
    "policy": [
     "讓客語重新走進日常",
     "文化驅動產業，活絡客庄經濟",
     "厚植客家藝文能量",
     "開創客語新生活"
    ],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "新竹縣": {
  "votes": 452720,
  "candidates": [
   {
    "name": "徐欣瑩",
    "party": "中國國民黨",
    "age": 54,
    "role": "立法委員",
    "color": "#1d4fa3",
    "photo": "assets/cand/徐欣瑩.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "鄭朝方",
    "party": "民主進步黨",
    "age": 46,
    "role": "竹北市長",
    "color": "#1b9431",
    "photo": "assets/cand/鄭朝方.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "新竹市": {
  "votes": 350758,
  "candidates": [
   {
    "name": "高虹安",
    "party": "無黨籍",
    "age": 42,
    "role": "新竹市長",
    "color": "#6b7385",
    "photo": "assets/cand/高虹安.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "莊競程",
    "party": "民主進步黨",
    "age": 45,
    "role": "民進黨新竹市長候選人",
    "color": "#1b9431",
    "photo": "assets/cand/莊競程.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "苗栗縣": {
  "votes": 443908,
  "candidates": [
   {
    "name": "鍾東錦",
    "party": "中國國民黨",
    "age": 63,
    "role": "苗栗縣長",
    "color": "#1d4fa3",
    "photo": "assets/cand/鍾東錦.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "陳品安",
    "party": "民主進步黨",
    "age": 42,
    "role": "苗栗縣議員",
    "color": "#1b9431",
    "photo": "assets/cand/陳品安.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "台中市": {
  "votes": 2274107,
  "candidates": [
   {
    "name": "江啟臣",
    "party": "中國國民黨",
    "age": 54,
    "role": "立法委員",
    "color": "#1d4fa3",
    "photo": "assets/cand/江啟臣.jpg",
    "bio": [],
    "policy": [
     "升級硬體設備",
     "打造台中大埔 IP 化",
     "大埔腔 AI 數位保存",
     "加強客庄意象、資源投注家庭"
    ],
    "policyNote": null,
    "link": null
   },
   {
    "name": "何欣純",
    "party": "民主進步黨",
    "age": 52,
    "role": "立法委員",
    "color": "#1b9431",
    "photo": "assets/cand/何欣純.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "彰化縣": {
  "votes": 1028606,
  "candidates": [
   {
    "name": "魏平政",
    "party": "中國國民黨",
    "age": 57,
    "role": "台北市政府市政顧問",
    "color": "#1d4fa3",
    "photo": "assets/cand/魏平政.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "陳素月",
    "party": "民主進步黨",
    "age": 60,
    "role": "立法委員",
    "color": "#1b9431",
    "photo": "assets/cand/陳素月.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "邱建富",
    "party": "無黨籍",
    "age": 65,
    "role": "彰化縣長候選人",
    "color": "#6b7385",
    "photo": "assets/cand/邱建富.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "南投縣": {
  "votes": 406195,
  "candidates": [
   {
    "name": "許淑華",
    "party": "中國國民黨",
    "age": 50,
    "role": "南投縣長",
    "color": "#1d4fa3",
    "photo": "assets/cand/許淑華.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "温世政",
    "party": "民主進步黨",
    "age": 53,
    "role": "牙醫師",
    "color": "#1b9431",
    "photo": "assets/cand/温世政.jpg",
    "bio": [],
    "policy": [
     "推動客庄創生計畫",
     "建立南投客食品牌",
     "打造複合式客庄生活交流中心",
     "重建客語教育系統",
     "推動客庄文化發電機",
     "鼓勵青年公共參與"
    ],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "雲林縣": {
  "votes": 559273,
  "candidates": [
   {
    "name": "張嘉郡",
    "party": "中國國民黨",
    "age": 45,
    "role": "立法委員",
    "color": "#1d4fa3",
    "photo": "assets/cand/張嘉郡.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "劉建國",
    "party": "民主進步黨",
    "age": 57,
    "role": "立法委員",
    "color": "#1b9431",
    "photo": "assets/cand/劉建國.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "嘉義縣": {
  "votes": 422568,
  "candidates": [
   {
    "name": "吳品叡",
    "party": "無黨籍",
    "age": 40,
    "role": "朴子市長",
    "color": "#6b7385",
    "photo": "assets/cand/吳品叡.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "蔡易餘",
    "party": "民主進步黨",
    "age": 45,
    "role": "立法委員",
    "color": "#1b9431",
    "photo": "assets/cand/蔡易餘.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "嘉義市": {
  "votes": 214130,
  "candidates": [
   {
    "name": "張啓楷",
    "party": "台灣民眾黨",
    "age": 63,
    "role": "嘉義市長候選人",
    "color": "#1fb6b6",
    "photo": "assets/cand/張啓楷.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "王美惠",
    "party": "民主進步黨",
    "age": 61,
    "role": "立法委員",
    "color": "#1b9431",
    "photo": "assets/cand/王美惠.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "台南市": {
  "votes": 1548203,
  "candidates": [
   {
    "name": "謝龍介",
    "party": "中國國民黨",
    "age": 64,
    "role": "立法委員",
    "color": "#1d4fa3",
    "photo": "assets/cand/謝龍介.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "陳亭妃",
    "party": "民主進步黨",
    "age": 52,
    "role": "立法委員",
    "color": "#1b9431",
    "photo": "assets/cand/陳亭妃.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "高雄市": {
  "votes": 2282623,
  "candidates": [
   {
    "name": "柯志恩",
    "party": "中國國民黨",
    "age": 64,
    "role": "立法委員",
    "color": "#1d4fa3",
    "photo": "assets/cand/柯志恩.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "賴瑞隆",
    "party": "民主進步黨",
    "age": 52,
    "role": "立法委員",
    "color": "#1b9431",
    "photo": "assets/cand/賴瑞隆.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "屏東縣": {
  "votes": 679330,
  "candidates": [
   {
    "name": "蘇清泉",
    "party": "中國國民黨",
    "age": 69,
    "role": "立法委員",
    "color": "#1d4fa3",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "周春米",
    "party": "民主進步黨",
    "age": 59,
    "role": "屏東縣長",
    "color": "#1b9431",
    "photo": "assets/cand/周春米.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "花蓮縣": {
  "votes": 266058,
  "candidates": [
   {
    "name": "游淑貞",
    "party": "中國國民黨",
    "age": 58,
    "role": "吉安鄉長",
    "color": "#1d4fa3",
    "photo": "assets/cand/游淑貞.jpg",
    "bio": [],
    "policy": [
     "推動花蓮 13 鄉鎮「一鄉一特色」",
     "寫下「花蓮志」保存客家地方文史",
     "推動客庄產業創生與青年返鄉",
     "發展客庄慢旅與文化觀光"
    ],
    "policyNote": null,
    "link": null
   },
   {
    "name": "魏嘉賢",
    "party": "無黨籍",
    "age": 48,
    "role": "花蓮縣議員",
    "color": "#6b7385",
    "photo": "assets/cand/魏嘉賢.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "張峻",
    "party": "無黨籍",
    "age": 52,
    "role": "花蓮縣議長",
    "color": "#6b7385",
    "photo": "assets/cand/張峻.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "台東縣": {
  "votes": 177853,
  "candidates": [
   {
    "name": "吳秀華",
    "party": "中國國民黨",
    "age": 53,
    "role": "台東縣議長",
    "color": "#1d4fa3",
    "photo": "assets/cand/吳秀華.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "陳瑩",
    "party": "民主進步黨",
    "age": 53,
    "role": "立法委員",
    "color": "#1b9431",
    "photo": "assets/cand/陳瑩.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "宜蘭縣": {
  "votes": 374779,
  "candidates": [
   {
    "name": "吳宗憲",
    "party": "中國國民黨",
    "age": 55,
    "role": "立法委員",
    "color": "#1d4fa3",
    "photo": "assets/cand/吳宗憲.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "林國漳",
    "party": "民主進步黨",
    "age": 57,
    "role": "律師",
    "color": "#1b9431",
    "photo": "assets/cand/林國漳.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "金門縣": {
  "votes": 122294,
  "candidates": [
   {
    "name": "陳玉珍",
    "party": "中國國民黨",
    "age": 52,
    "role": "立法委員",
    "color": "#1d4fa3",
    "photo": "assets/cand/陳玉珍.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "李文良",
    "party": "無黨籍",
    "age": 55,
    "role": "國立金門大學助理教授",
    "color": "#6b7385",
    "photo": "assets/cand/李文良.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "連江縣": {
  "votes": 11810,
  "candidates": [
   {
    "name": "王忠銘",
    "party": "中國國民黨",
    "age": 68,
    "role": "連江縣長",
    "color": "#1d4fa3",
    "photo": "assets/cand/王忠銘.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "曹爾元",
    "party": "無黨籍",
    "age": 68,
    "role": "連江縣長候選人",
    "color": "#6b7385",
    "photo": "assets/cand/曹爾元.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 },
 "澎湖縣": {
  "votes": 90360,
  "candidates": [
   {
    "name": "陳振中",
    "party": "中國國民黨",
    "age": 63,
    "role": "湖西鄉長",
    "color": "#1d4fa3",
    "photo": "assets/cand/陳振中.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   },
   {
    "name": "吳淑瑾",
    "party": "民主進步黨",
    "age": 69,
    "role": "澎湖縣長候選人",
    "color": "#1b9431",
    "photo": "assets/cand/吳淑瑾.jpg",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null
   }
  ]
 }
};
