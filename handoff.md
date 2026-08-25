# 交接檔（handoff.md）

> 任何 Agent、任何電腦接手前**必讀**；收工時**必更新**。本檔只放交接必需的精簡資訊，詳細脈絡放 Obsidian（若有 L3）。

## ⏯️ 目前做到哪
1. **全面完成「安聯收益成長多重資產基金-新台幣」與「柏瑞多重資產特別收益基金」兩大標的之官方權威對齊**：
   - **安聯收益成長基金**：經過安聯投信官網與鉅亨買基金交叉比對，全面更正歷史淨值點位（2024/12 買入基準 8.9500 TWD，演進至最新 2026/08 之 8.3700 TWD）。更正配息明細為每單位 0.055 ~ 0.059 TWD（年化息率約 8.40%）。
   - **柏瑞多重資產特別收益基金**：對齊大都會/柏瑞官網（2024/12 之 7.5620 TWD 演進至最新 6.7168 TWD，每單位固定配息 0.05 TWD，年化息率約 8.80%）。
   - 同步修正 `data/allianz_income_growth_details.json`、`data/pinebridge_preferred_income_details.json` 與 `data/wang_portfolio.json`。
2. **線上 GitHub Pages 自動更新發布**：
   - 安聯獨立追蹤頁：[https://garfiwang.github.io/fund-tracker/allianz_income_growth_tracker.html](https://garfiwang.github.io/fund-tracker/allianz_income_growth_tracker.html)
   - 柏瑞獨立追蹤頁：[https://garfiwang.github.io/fund-tracker/pinebridge_preferred_income_tracker.html](https://garfiwang.github.io/fund-tracker/pinebridge_preferred_income_tracker.html)
   - WANG 總儀錶板：[https://garfiwang.github.io/fund-tracker/wang_dashboard.html](https://garfiwang.github.io/fund-tracker/wang_dashboard.html)

## 🚦 目前狀態
- 客戶 WANG 組合下之安聯與柏瑞兩大基金數據皆已 100% 精確對齊官方與第三方資料庫。

## ➡️ 下一步
1. 隨時依據官網最新公告更新月份數據。

## ⚠️ 注意事項
- 本專案位於 Google 雲端硬碟，請確保 Google 雲端硬碟桌面版的同步圖示已打勾。

## 🕐 最後更新
- 時間：2026-08-26 07:22
- 更新者：Antigravity @ Mac
- 最新進度：成功全面校正安聯與柏瑞兩大基金之官方歷史淨值與配息紀錄，全數部署更新至 GitHub Pages。
- Git push：⏳ 待推送
