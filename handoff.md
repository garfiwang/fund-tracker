# 交接檔（handoff.md）

> 任何 Agent、任何電腦接手前**必讀**；收工時**必更新**。本檔只放交接必需的精簡資訊，詳細脈絡放 Obsidian（若有 L3）。

## ⏯️ 目前做到哪
1. **更換客戶 WANG 投資組合標的**：
   - 應客戶需求，已將二號標的由「中國信託科技趨勢多重資產基金」替換為**「柏瑞多重資產特別收益基金-B類型(新台幣)」**（ISIN: `TW000T2125B8`，風險等級 RR3，最新淨值 `6.6403 TWD`）。
   - 已刪除舊檔 `data/ctbc_tech_trend_details.json` 並新建 `data/pinebridge_preferred_income_details.json`。
   - 已更新 `data/wang_portfolio.json`、`wang_app.js` 與 `wang_dashboard.html`，同步連動計算 300 萬本金配置與歷史成長趨勢。
2. **線上 GitHub Pages 新網址發布**：
   - 客戶 WANG 專屬儀錶板：[https://garfiwang.github.io/fund-tracker/wang_dashboard.html](https://garfiwang.github.io/fund-tracker/wang_dashboard.html)
   - 6 檔精選國企與高股息儀錶板：[https://garfiwang.github.io/fund-tracker/](https://garfiwang.github.io/fund-tracker/)

## 🚦 目前狀態
- 標的更換與數據計算已全數完成，JSON 解析與前端介面皆經驗證無誤。

## ➡️ 下一步
1. 隨時依據客戶需求微調與擴充最新月份數據。

## ⚠️ 注意事項
- 本專案位於 Google 雲端硬碟，請確保 Google 雲端硬碟桌面版的同步圖示已打勾。

## 🕐 最後更新
- 時間：2026-08-26 00:40
- 更新者：Antigravity @ Mac
- 最新進度：成功將客戶 WANG 組合二號標的更新為「柏瑞多重資產特別收益-B」，並已同步 push 更新至 GitHub Pages。
- Git push：⏳ 待推送
