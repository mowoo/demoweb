# demoweb

數位互動專題網頁留存集，以入口頁串連，純靜態 HTML/JS/CSS。

線上：<https://mowoo.github.io/demoweb/>

## 專題清單

| 子路徑 | 標題 | 副標 | 原始上線 |
| --- | --- | --- | --- |
| [`/farmland/`](./farmland/) | 荒地金磚 2.0 | 鋤不動的鑽石田 | 2020 |
| [`/eslitedunnan/`](./eslitedunnan/) | 再見敦南誠品 | 熄燈前的最後巡禮 | 2020-05 |
| [`/firstaid/`](./firstaid/) | 命懸一線 | 我們沒有生病的權利 | 2020-11 |
| [`/metoo/`](./metoo/) | 3 個被性侵的母親 | 印、越、菲移工在台灣的處境調查 | — |
| [`/flyfree/`](./flyfree/) | 放心飛吧 | 八八風災失依兒少陪伴紀實 | 2026-06 |
| [`/3dprint/`](./3dprint/) | 2026 拓竹系列比較 | 四款 3D 列印機的條件達標比對 | 2026-07 |

> `metoo` 與 `flyfree` 原本漏登錄，一併補上。

## 本地預覽

```powershell
# 在 demoweb 目錄底下
python -m http.server 8000
```

瀏覽器開 <http://localhost:8000/>。

`farmland` 內 `main.min.js` 用 XHR 載 SVG，`file://` 開不會動，必須走 HTTP server。

## 已知限制

- `og:image` / `og:url` 多半 hardcode 蘋果新聞網舊網址，FB 分享預覽圖會錯，但不影響頁面顯示。
- 各專題的 FB SDK、YouTube、GA、Hotjar、第三方 CDN 縮圖可能 404，console 會報錯，不影響核心內容。
- 純前端，無 build 步驟。

## 目錄結構

```text
demoweb/
├── index.html         # 入口頁
├── style.css          # 入口頁樣式
├── assets/            # 入口頁縮圖
├── farmland/          # 子專案（原樣保留）
├── eslitedunnan/
├── firstaid/
├── metoo/
├── flyfree/
└── 3dprint/           # 設計練習作品，非新聞專題
```

## 3dprint 說明

與其餘專題性質不同：**這是設計練習作品，不是委任的新聞專題**。頁尾有完整的免責與版權聲明（六條），要點：

- 公開展示之設計練習，非商業用途，與拓竹／Snapmaker 等品牌無任何商業關聯或委任關係
- 頁內所有機器影像與情境影像**均為 AI 生成示意，非實機照片**，畫面上有常駐標示；未使用任何原廠產品照或行銷素材
- 規格與價格彙整自各原廠公開資料與公開媒體報導（查核日期標註於各章節），僅供參考
- 權利人通知即無條件下架

素材僅保留頁面實際引用者（字型、Hero 影格 121 張、機型示意 4 張、氛圍圖 4 張，合計約 4.3MB）；生成過程的候選檔與原始高解析檔留在來源目錄，不入 repo。
