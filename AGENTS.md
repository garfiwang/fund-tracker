# 基金追蹤（專案藍圖）

> 本檔為跨 Agent 通用的專案藍圖（AGENTS.md 開放標準）。任何 Agent 的每個 session 都應先讀本檔＋`handoff.md`。

## 專案簡介
基金追蹤專案。專粹追蹤您設定之五檔中國地產國企與高股息基金/ETF 淨值動態、資產配置與研究報告。

## 核心追蹤標的 (5 檔)
1. **滙豐環球投資基金 - 中國股票** (`LU0039216972`)
2. **富達基金 - 中國焦點基金** (`LU0173614495`)
3. **復華中國基礎建設基金** (`TW000T0623B0`)
4. **摩根中國基金** (`LU0210526637`)
5. **中國信託恒生中國高股息ETF基金** (`00882`)

## 目標與路線圖
- [x] 階段一：專案需求確認與三層級基礎建置
- [x] 階段二：全數清理舊專案關聯檔案與獨立 GitHub Pages 上線
  - [x] 刪除 Sun 舊帳戶、精選7檔基金與舊報告等無關檔案
  - [x] 重構 `index.html` 成為專屬 5 檔地產國企與高股息基金追蹤儀錶板
  - [x] 部署全新 GitHub Pages (`https://garfiwang.github.io/fund-tracker/`)
- [ ] 階段三：持續追蹤 5 檔基金最新歷史淨值與圖表擴充

## 資料夾結構
```
[Project] 基金追蹤/
├── .gitignore
├── AGENTS.md
├── handoff.md
├── index.html
├── china_property_soe_research.html
├── 五檔中國地產國企新基金投資研究報告.md
├── styles.css
├── app.js
└── data/
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
