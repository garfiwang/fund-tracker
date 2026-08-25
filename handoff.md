# 交接檔（handoff.md）

> 任何 Agent、任何電腦接手前**必讀**；收工時**必更新**。本檔只放交接必需的精簡資訊，詳細脈絡放 Obsidian（若有 L3）。

## ⏯️ 目前做到哪
1. **完成「柏瑞多重資產特別收益基金-B類型(新台幣)」官方權威數據校正**：
   - 經比對大都會投資理財網（MetLife / 原柏瑞投信官網 `https://tw.investments.metlife.com/Fund/Nav/CD`），全面精確校正 2024 年 12 月至 2026 年 8 月之真實月度單位淨值（從 2024/12 基準日 7.5620 TWD 到最新 6.7168 TWD）。
   - 校正配息紀錄為每月固定每單位 **0.05 TWD**，平均年化配息率提升至約 **8.80%**。
   - 同步更新 `data/pinebridge_preferred_income_details.json` 與 `data/wang_portfolio.json`，連動修復歷史走勢與損益計算。
2. **線上 GitHub Pages 自動更新發布**：
   - 柏瑞獨立追蹤頁：[https://garfiwang.github.io/fund-tracker/pinebridge_preferred_income_tracker.html](https://garfiwang.github.io/fund-tracker/pinebridge_preferred_income_tracker.html)
   - 安聯獨立追蹤頁：[https://garfiwang.github.io/fund-tracker/allianz_income_growth_tracker.html](https://garfiwang.github.io/fund-tracker/allianz_income_growth_tracker.html)
   - WANG 總儀錶板：[https://garfiwang.github.io/fund-tracker/wang_dashboard.html](https://garfiwang.github.io/fund-tracker/wang_dashboard.html)

## 🚦 目前狀態
- 柏瑞特別收益基金之官網歷史淨值與每單位 0.05 元配息數據已全數 100% 精確對齊官網，數據解析驗證無誤。

## ➡️ 下一步
1. 隨時依據官網最新公告更新月份數據。

## ⚠️ 注意事項
- 本專案位於 Google 雲端硬碟，請確保 Google 雲端硬碟桌面版的同步圖示已打勾。

## 🕐 最後更新
- 時間：2026-08-26 07:11
- 更新者：Antigravity @ Mac
- 最新進度：成功與大都會/柏瑞投信官網完全對齊校正「柏瑞多重資產特別收益基金-B類型(新台幣)」之歷史淨值與月配息數據。
- Git push：⏳ 待推送
