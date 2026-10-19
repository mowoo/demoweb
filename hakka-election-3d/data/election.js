/* 選戰資料：選票數、候選人、客家政策。2026-10-19 依客戶 Google 文件「縣市長候選人」套入 14 縣市（選舉人數為 2022 年資料）；
   基隆／彰化／嘉義縣／嘉義市／宜蘭／澎湖／金門／連江仍為佔位。
   鍵值 = 縣市名（「台」寫法，與 hakka.js 一致）。
   votes   : 選舉人數（整數）；null 顯示「待補」
   photo   : 插畫圖檔路徑（去背 PNG，約 600×600）；目前為示意人像 assets/cand/placeholder-a/b.png
   photoPlaceholder: true 時卡片顯示「示意」標記，換成正式插畫後刪掉此欄位
   color   : 候選人代表色（目前中性青／橘，待決定是否依政黨色）
   age     : 整數；null 顯示「待補」
   bio     : 重要經歷，3 條以內
   policy  : 客家政策，字串（一句）或陣列（多條要點）；policyNote 為補充說明（如「2022 年所提」）
   link    : 專訪新聞網址（另開新頁）；未填時先連到客新聞首頁 */
window.ELECTION = {
 "新北市": {
  "votes": 3316517,
  "candidates": [
   {
    "name": "李四川",
    "party": "中國國民黨",
    "age": 68,
    "role": "國民黨新北市長候選人",
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "蘇巧慧",
    "party": "民主進步黨",
    "age": 50,
    "role": "立法委員",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
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
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "沈伯洋",
    "party": "民主進步黨",
    "age": 44,
    "role": "立法委員",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
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
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [
     "全球新客都",
     "扎根客語教育",
     "科技助力客家文創",
     "客家文化永續發展"
    ],
    "policyNote": "（2022 年所提）",
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "黃世杰",
    "party": "民主進步黨",
    "age": 47,
    "role": "民進黨桃園市長候選人",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [
     "讓客語重新走進日常",
     "文化驅動產業，活絡客庄經濟",
     "厚植客家藝文能量",
     "開創客語新生活"
    ],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
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
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [
     "升級硬體設備",
     "打造台中大埔 IP 化",
     "大埔腔 AI 數位保存",
     "加強客庄意象、資源投注家庭"
    ],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "何欣純",
    "party": "民主進步黨",
    "age": 52,
    "role": "立法委員",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
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
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "陳亭妃",
    "party": "民主進步黨",
    "age": 52,
    "role": "立法委員",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
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
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "賴瑞隆",
    "party": "民主進步黨",
    "age": 52,
    "role": "立法委員",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   }
  ]
 },
 "宜蘭縣": {
  "votes": null,
  "candidates": [
   {
    "name": "候選人甲",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "候選人乙",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
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
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "鄭朝方",
    "party": "民主進步黨",
    "age": 46,
    "role": "竹北市長",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
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
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "陳品安",
    "party": "民主進步黨",
    "age": 42,
    "role": "苗栗縣議員",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   }
  ]
 },
 "彰化縣": {
  "votes": null,
  "candidates": [
   {
    "name": "候選人甲",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "候選人乙",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
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
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "温世政",
    "party": "民主進步黨",
    "age": 53,
    "role": "牙醫師",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
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
    "link": null,
    "photoPlaceholder": true
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
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "劉建國",
    "party": "民主進步黨",
    "age": 57,
    "role": "立法委員",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   }
  ]
 },
 "嘉義縣": {
  "votes": null,
  "candidates": [
   {
    "name": "候選人甲",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "候選人乙",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
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
    "color": "#1f7a8c",
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
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
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
    "role": "台東縣會議長",
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "陳瑩",
    "party": "民主進步黨",
    "age": 53,
    "role": "立法委員",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
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
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [
     "推動花蓮 13 鄉鎮「一鄉一特色」",
     "寫下「花蓮志」保存客家地方文史",
     "推動客庄產業創生與青年返鄉",
     "發展客庄慢旅與文化觀光"
    ],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "魏嘉賢",
    "party": "無黨籍",
    "age": 48,
    "role": "花蓮縣議員",
    "color": "#6b7385",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "張峻",
    "party": "無黨籍",
    "age": 52,
    "role": "花蓮縣會議長",
    "color": "#6b7385",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   }
  ]
 },
 "基隆市": {
  "votes": null,
  "candidates": [
   {
    "name": "候選人甲",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "候選人乙",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
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
    "photo": "assets/cand/placeholder-a.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "莊競程",
    "party": "民主進步黨",
    "age": 45,
    "role": "民進黨新竹市長候選人",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [],
    "policy": [],
    "policyNote": null,
    "link": null,
    "photoPlaceholder": true
   }
  ]
 },
 "嘉義市": {
  "votes": null,
  "candidates": [
   {
    "name": "候選人甲",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "候選人乙",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   }
  ]
 },
 "金門縣": {
  "votes": null,
  "candidates": [
   {
    "name": "候選人甲",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "候選人乙",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   }
  ]
 },
 "連江縣": {
  "votes": null,
  "candidates": [
   {
    "name": "候選人甲",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "候選人乙",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   }
  ]
 },
 "澎湖縣": {
  "votes": null,
  "candidates": [
   {
    "name": "候選人甲",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#1f7a8c",
    "photo": "assets/cand/placeholder-a.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   },
   {
    "name": "候選人乙",
    "party": "（黨籍待補）",
    "age": null,
    "role": "（現職待補）",
    "color": "#d9822b",
    "photo": "assets/cand/placeholder-b.png",
    "bio": [
     "重要經歷一（待補）",
     "重要經歷二（待補）",
     "重要經歷三（待補）"
    ],
    "policy": "（客家政策標題待補）",
    "link": null,
    "photoPlaceholder": true
   }
  ]
 }
};
