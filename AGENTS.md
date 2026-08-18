# 基金追蹤（專案藍圖）

> 本檔為跨 Agent 通用的專案藍圖（AGENTS.md 開放標準）。任何 Agent 的每個 session 都應先讀本檔＋`handoff.md`。

## 專案簡介
基金追蹤專案。負責追蹤使用者所設定之各檔基金淨值動態、投資組合資產配置、交易明細與績效追蹤分析。

## 核心追蹤標的 (首波 5 檔)
1. **滙豐環球投資基金 - 中國股票** (`LU0039216972`)
2. **富達基金 - 中國焦點基金** (`LU0173614495`)
3. **復華中國基礎建設基金** (`TW000T0623B0`)
4. **摩根中國基金** (`LU0210526637`)
5. **中國信託恒生中國高股息ETF基金** (`00882`)

## 目標與路線圖
- [x] 階段一：專案需求確認與三層級基礎建置 (L1, L2, L3 已建立)
- [x] 階段二：基金追蹤標的設定與獨立儲存庫/GitHub Pages 初始化
  - [x] 導入「五檔中國地產國企與高股息基金」標的名單與研究報告
  - [x] 建立全新專屬 GitHub Repository (`garfiwang/fund-tracker`)
  - [x] 開啟並部署全新 GitHub Pages 網站儀錶板
- [ ] 階段三：持續追蹤基金淨值更新、擴充更多關注標的與開發視覺化分析圖表

## 資料夾結構
```
[Project] 基金追蹤/
├── .gitignore
├── AGENTS.md
├── handoff.md
├── index.html
├── china_property_soe_research.html
├── featured_funds.html
├── 五檔中國地產國企新基金投資研究報告.md
├── styles.css
└── data/
```

## 同步層級（本專案初始化至第 3 層級）

| 層級 | 平台 | 位置 | 讀取時機 |
|------|------|------|---------|
| L1 | 本地（GDrive） | `AGENTS.md`＋`handoff.md` | 每個 session |
| L2 | GitHub | [garfiwang/fund-tracker](https://github.com/garfiwang/fund-tracker) | 指定時 |
| L3 | Obsidian | `[Project] 基金追蹤/專案工作流程.md` | 有需要時 |

## 工作約定
- 任何 Agent、任何電腦：**開工先讀 `handoff.md`，收工必更新 `handoff.md`**
- 修改共用檔案前先讀最新內容，避免覆蓋其他 Agent 的變更
- 所有回應與文件使用繁體中文
- 本專案為獨立之「基金追蹤」系統，與特定客戶舊專案隔開
