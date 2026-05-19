# 本地開啟操作小筆記

## 啟動 server

在 `h:\AI_web\專題\farmland` 資料夾，開 PowerShell 執行：

```powershell
python -m http.server 8000
```

瀏覽器打開：**http://localhost:8000/**

## 停止 server

在啟動的 terminal 按 `Ctrl + C`

## Port 被佔用

換一個 port：

```powershell
python -m http.server 8001
```

## 為什麼不能直接雙擊 index.html

`main.min.js` 用 `XMLHttpRequest` 載入 `Taiwanese_Mandarin_Usage_Map.svg`，
瀏覽器在 `file://` 協定下會擋 XHR，台灣地圖會載不出來。
必須透過 HTTP server 開啟。

## 預期狀況

- 台灣地圖、所有本地圖片正常顯示
- 外部 6 張 S3 縮圖（appledaily 其他專題區）可能 404，不影響主內容
- Facebook 留言/分享、YouTube 影片需要網路
- GA / Hotjar 會在 console 報錯，但不影響畫面
