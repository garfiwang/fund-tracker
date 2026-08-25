# 基金追蹤（專案藍圖）

> 本檔為跨 Agent 通用的專案藍圖（AGENTS.md 開放標準）。任何 Agent 的每個 session 都應先讀本檔＋`handoff.md`。

## 專案簡介
基金追蹤專案。專粹追蹤您設定之五檔中國地產國企與高股息基金/ETF 淨值動態、資產配置與研究報告。

## 核心追蹤標的 (6 檔)
1. **滙豐環球投資基金 - 中國股票** (`LU0039216972`)
2. **富達基金 - 中國焦點基金** (`LU0173614495`)
3. **復華中國基礎建設基金** (`TW000T0623B0`)
4. **摩根中國基金** (`LU0210526637`)
5. **中國信託恒生中國高股息ETF基金** (`00882`)
6. **東方匯理實質收息多重資產證券投資信託基金-AD 月配型(新臺幣)** (`TW000T3523C1`)

## 目標與路線圖
- [x] 階段一：專案需求確認與三層級基礎建置
- [x] 階段二：全數清理舊專案關聯檔案與獨立 GitHub Pages 上線
  - [x] 刪除 Sun 舊帳戶、精選7檔基金與舊報告等無關檔案
  - [x] 重構 `index.html` 成為專屬地產國企與高股息基金追蹤儀錶板
  - [x] 部署全新 GitHub Pages (`https://garfiwang.github.io/fund-tracker/`)
- [x] 階段三：新增客戶 WANG 專屬多重資產基金追蹤儀錶板 (300萬 NTD 起投，安聯收益成長 + 柏瑞多重資產特別收益-B)
- [ ] 階段四：持續追蹤精選基金最新歷史淨值與圖表擴充

## 資料夾結構
```
[Project] 基金追蹤/
├── .gitignore
├── AGENTS.md
├── handoff.md
├── index.html
├── wang_dashboard.html
├── wang_app.js
├── allianz_income_growth_tracker.html
├── pinebridge_preferred_income_tracker.html
├── fund_detail_app.js
├── china_property_soe_research.html
├── 五檔中國地產國企新基金投資研究報告.md
├── styles.css
├── app.js
└── data/
    ├── allianz_income_growth_details.json
    ├── pinebridge_preferred_income_details.json
    ├── wang_portfolio.json
    ├── amundi_real_income_details.json
    ├── ctbc_00882_details.json
    ├── fidelity_china_details.json
    ├── fuhhwa_infra_details.json
    ├── hsbc_china_details.json
    └── jpmorgan_china_details.json
```

## 同步層級

| 層級 | 平台 | 位置 | 讀取時機 |
|------|------|------|---------|
| L1 | 本地（GDrive） | `AGENTS.md`＋`handoff.md` | 每個 session |
| L2 | GitHub | [garfiwang/fund-tracker](https://github.com/garfiwang/fund-tracker) | 指定時 |
| L3 | Obsidian | `[Project] 基金追蹤/專案工作流程.md` | 有需要時 |

## 工作約定
- 任何 Agent、任何電腦：**開工先讀 `handoff.md`，收工必更新 `handoff.md`**
- 修改共用檔案前先讀最新內容，避免覆蓋其他 Agent 的變更
- 所有回應與文件使用繁體中文
- 本專案僅專注於這 5 檔基金之追蹤
