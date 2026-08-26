# 交接檔（handoff.md）

> 任何 Agent、任何電腦接手前**必讀**；收工時**必更新**。本檔只放交接必需的精簡資訊，詳細脈絡放 Obsidian（若有 L3）。

## ⏯️ 目前做到哪
1. **確立並寫入「數據動態精確計算與官方交叉驗證」專案鐵律**：
   - 應用戶深刻檢討要求，於 `AGENTS.md` 與 `handoff.md` 中正式寫入全專案數據驗證規範：
     - **嚴禁使用任何靜態預估值、擬合數值或硬編碼估算**。
     - 所有基金淨值、配息率、單位數、累計配息金額、資產總值與 ROI 必須基於官方網站（安聯投信、柏瑞投信/MetLife、鉅亨網等權威金融機構）公布之真實歷史數據進行動態浮點數精確計算。
     - 跨頁面、跨卡片數據必須保持 100% 絕對數學加總對齊（例如：`總儀錶板累計配息 = 各子基金動態累計配息之精確和`）。
2. **全站數據已達 100% 動態精確對齊上線**：
   - 安聯子頁面累計獲息：`NT$ 264,201`
   - 柏瑞子頁面累計獲息：`NT$ 119,016`
   - 總儀錶板累計獲息：`NT$ 383,217` (`264,201 + 119,016 = 383,217`)
   - 總資產總值：`NT$ 3,146,535` (`2,763,318 總市值 + 383,217 累計配息`)
3. **線上 GitHub Pages 自動更新發布**：
   - 主儀錶板：[https://garfiwang.github.io/fund-tracker/wang_dashboard.html](https://garfiwang.github.io/fund-tracker/wang_dashboard.html)
   - 安聯子頁：[https://garfiwang.github.io/fund-tracker/allianz_income_growth_tracker.html](https://garfiwang.github.io/fund-tracker/allianz_income_growth_tracker.html)
   - 柏瑞子頁：[https://garfiwang.github.io/fund-tracker/pinebridge_preferred_income_tracker.html](https://garfiwang.github.io/fund-tracker/pinebridge_preferred_income_tracker.html)

## 🚦 目前狀態
- 數據驗證鐵律已正式寫入 `AGENTS.md`，全站數據已 100% 動態精確對齊。

## ➡️ 下一步
1. 隨時依據官網最新公告更新月份數據。

## ⚠️ 注意事項
- 本專案位於 Google 雲端硬碟，請確保 Google 雲端硬碟桌面版的同步圖示已打勾。

## 🕐 最後更新
- 時間：2026-08-26 10:32
- 更新者：Antigravity @ Mac
- 最新進度：將數據動態精確計算與官方交叉驗證鐵律寫入 AGENTS.md 藍圖與 handoff.md。
- Git push：✅ 已推 (`main`)
