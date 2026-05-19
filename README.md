# demoweb

數位互動專題網頁留存集。三個專題以入口頁串連，純靜態 HTML/JS/CSS。

線上：<https://mowoo.github.io/demoweb/>

## 專題清單

| 子路徑 | 標題 | 副標 | 原始上線 |
| --- | --- | --- | --- |
| [`/farmland/`](./farmland/) | 荒地金磚 2.0 | 鋤不動的鑽石田 | 2020 |
| [`/eslitedunnan/`](./eslitedunnan/) | 再見敦南誠品 | 熄燈前的最後巡禮 | 2020-05 |
| [`/firstaid/`](./firstaid/) | 命懸一線 | 我們沒有生病的權利 | 2020-11 |

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
└── firstaid/
```
