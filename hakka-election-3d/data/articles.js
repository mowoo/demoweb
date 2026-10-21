/* 地圖下方「選戰報導」六格：2026-10-23 從客新聞 hakkanews.tw 的 WordPress REST API 自動撈取（標題含選舉／選戰／縣市長／候選／參選／九合一／政見／投票／辯論，近期優先）。
   縮圖直接引用客新聞圖檔；tag 統一標「選戰」。重新撈取：python tools/fetch_news.py，再把結果貼進 ARTICLES。
   title 標題（兩行內）／tag 分類標籤／date 日期／img 縮圖網址（16:9；null 顯示灰底）／url 文章連結 */
window.ARTICLES = [
  {
    "title": "澎湖縣長選舉　公辦政見會辯論方式進行",
    "tag": "選戰",
    "date": "2026/10/20",
    "img": "https://gcs.hakkanews.tw/2026/10/2026-10-20-9232d76f2024a2982b0d62666d9737fb.webp",
    "url": "https://hakkanews.tw/2026/10/20/308192/"
  },
  {
    "title": "民主列車募資開跑　助青年128元返鄉投票",
    "tag": "選戰",
    "date": "2026/10/14",
    "img": "https://gcs.hakkanews.tw/2026/10/2026-10-14-03091542b741788805a6d70a2e8e689c.webp",
    "url": "https://hakkanews.tw/2026/10/14/307175/"
  },
  {
    "title": "台中市長選戰辯論　何欣純已簽署同意、江啟臣持開放態度",
    "tag": "選戰",
    "date": "2026/10/13",
    "img": "https://gcs.hakkanews.tw/2026/10/2026-10-14-3061055e191f156381ab2061ea6c8205.webp",
    "url": "https://hakkanews.tw/2026/10/13/307138/"
  },
  {
    "title": "竹北市長拚選戰　3參選人提育兒、臨托及社區服務",
    "tag": "選戰",
    "date": "2026/10/05",
    "img": "https://gcs.hakkanews.tw/2026/10/2026-10-06-9c7e7975daeffcc5d930885a7f5281de.webp",
    "url": "https://hakkanews.tw/2026/10/05/306095/"
  },
  {
    "title": "何來美／回顧政黨分合　冷看今年選舉",
    "tag": "選戰",
    "date": "2026/09/18",
    "img": "https://gcs.hakkanews.tw/2026/09/2026-09-18-2026-1.webp",
    "url": "https://hakkanews.tw/2026/09/18/303946/"
  },
  {
    "title": "九合一選舉查不法金流212案 查扣犯罪所得逾9億元",
    "tag": "選戰",
    "date": "2026/09/08",
    "img": "https://gcs.hakkanews.tw/2026/09/2026-09-08-95ea68491b8f5a46aa3acb2009b2cab3.webp",
    "url": "https://hakkanews.tw/2026/09/08/302033/"
  }
];

/* 專題製作名單（格式比照 hakkanews.tw/1786hero/）。目前為佔位，確定後填入姓名。
   每列 [職稱, 內容]；內容可寫多人（用「、」分隔）。 */
window.CREDITS = [
  ['統籌', '（姓名待補）'],
  ['文字', '（姓名待補）'],
  ['影像', '（姓名待補）'],
  ['數位', '（姓名待補）'],
  ['視覺', '（單位待補）'],
];
