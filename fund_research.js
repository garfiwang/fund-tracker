/**
 * Dedicated Fund Research Page Logic (柏瑞多重資產特別收益基金-B類型)
 */

const fallbackFundDetails = {
  fund_code: "BGTPB022",
  fund_name: "柏瑞多重資產特別收益證券投資信託基金 - B類型 - (配現金)",
  isin: "TW000T2125B8",
  currency: "TWD",
  risk_level: "RR3",
  latest_dividend_per_unit: 0.05,
  latest_nav: 6.6267,
  latest_nav_date: 2026-08-13,
  subscription_price: 6.7806,
  subscription_date: "2026-06-29",
  nav_30_days: [
    { date: 2026/08/25, nav: 6.7920, change: 0.0070 },
    { date: 2026/08/24, nav: 6.7850, change: 0.0070 },
    { date: 2026/08/21, nav: 6.7780, change: 0.0060 },
    { date: 2026/08/20, nav: 6.7720, change: 0.0070 },
    { date: 2026/08/19, nav: 6.7650, change: 0.0060 },
    { date: 2026/08/18, nav: 6.7590, change: 0.0070 },
    { date: 2026/08/17, nav: 6.7520, change: 0.0070 },
    { date: 2026/08/14, nav: 6.7450, change: 0.0065 },
    { date: 2026/08/13, nav: 6.7385, change: 0.0065 },
    { date: 2026/08/12, nav: 6.7320, change: 0.0040 },
    { date: 2026/08/11, nav: 6.7280, change: 0.0065 },
    { date: 2026/08/10, nav: 6.7215, change: 0.0100 },
    { date: "2026/08/07", nav: 6.7115, change: -0.0015 },
    { date: "2026/08/06", nav: 6.7130, change: 0.0002 },
    { date: "2026/08/05", nav: 6.7128, change: 0.0046 },
    { date: "2026/08/04", nav: 6.7082, change: 0.0139 },
    { date: "2026/08/01", nav: 6.6943, change: -0.0272 },
    { date: "2026/07/31", nav: 6.7215, change: 0.0035 },
    { date: "2026/07/30", nav: 6.7180, change: 0.0090 },
    { date: "2026/07/29", nav: 6.7090, change: -0.0220 },
    { date: "2026/07/28", nav: 6.7310, change: 0.0060 },
    { date: "2026/07/25", nav: 6.7250, change: 0.0040 },
    { date: "2026/07/24", nav: 6.7210, change: -0.0095 },
    { date: "2026/07/23", nav: 6.7305, change: -0.0275 },
    { date: "2026/07/22", nav: 6.7580, change: -0.0042 },
    { date: "2026/07/21", nav: 6.7622, change: 0.0032 },
    { date: "2026/07/18", nav: 6.7590, change: 0.0080 },
    { date: "2026/07/17", nav: 6.7510, change: 0.0030 },
    { date: "2026/07/16", nav: 6.7480, change: -0.0170 },
    { date: "2026/07/15", nav: 6.7650, change: -0.0060 },
    { date: "2026/07/14", nav: 6.7710, change: 0.0020 },
    { date: "2026/07/11", nav: 6.7690, change: -0.0060 },
    { date: "2026/07/10", nav: 6.7750, change: -0.0030 },
    { date: "2026/07/09", nav: 6.7780, change: -0.0026 }
  ],
  yearly_nav_summary: [
    { year: "2024", nav_range: "6.75 - 7.15 元", dividend_note: "月配 NT$ 0.05 / 單位", description: "全球債市受降息預期影響，淨值於 6.75~7.15 區間震盪" },
    { year: "2025", nav_range: "6.65 - 6.95 元", dividend_note: "月配 NT$ 0.05 / 單位", description: "利息持續穩定發放，除息後淨值保持相對穩定" },
    { year: "2026 (至今)", nav_range: "6.67 - 6.79 元", dividend_note: "月配 NT$ 0.05 / 單位", description: "截至 8 月最新約 6.7128 元，申購價為 6.7806 元 (2026/06/29)" }
  ],
  top_holdings: [
    { rank: 1, name: "柏瑞環球重點股票基金 Y (PineBridge Global Focus Equity Y)", type: "股票型基金", country: "愛爾蘭", weight: "9.23%" },
    { rank: 2, name: "花旗集團 Citigroup (C 0 / C 6.45)", type: "金融特別股/債", country: "美國", weight: "3.26%" },
    { rank: 3, name: "美國銀行 Bank of America (BAC 6.45 K*)", type: "金融特別股/債", country: "美國", weight: "3.21%" },
    { rank: 4, name: "瑞銀集團 UBS 7 3/4 PERP", type: "金融永續債", country: "瑞士", weight: "2.41%" },
    { rank: 5, name: "荷蘭國際集團 ING Group (INTNED 8 PERP)", type: "金融永續債", country: "荷蘭", weight: "2.36%" },
    { rank: 6, name: "加拿大帝國商業銀行 CIBC (CM 7 10/28/2085)", type: "金融長天期債", country: "加拿大", weight: "2.24%" },
    { rank: 7, name: "南方電力 Southern Co (SO 6.5)", type: "公用事業特別債", country: "美國", weight: "2.00%" },
    { rank: 8, name: "福特汽車公司 Ford Motor Co (F 6.5)", type: "企業債券", country: "美國", weight: "1.89%" },
    { rank: 9, name: "聯合能源 Xcel Energy (XEL 6.25)", type: "公用事業特別債", country: "美國", weight: "1.73%" },
    { rank: 10, name: "柱石電力 Dominion Energy (D 7 06/01/54)", type: "公用事業特別債", country: "美國", weight: "1.51%" }
  ],
  regions: [
    { region: "美國 (United States)", flag: "🇺🇸", weight: "62.5%", desc: "主要配置於金融特別股、公用事業債及高收益債" },
    { region: "加拿大 (Canada)", flag: "🇨🇦", weight: "10.2%", desc: "大型銀行金融債與公用事業資產" },
    { region: "歐洲 / 歐元區 (Europe)", flag: "🇪🇺", weight: "13.8%", desc: "包含英國、荷蘭、瑞士、愛爾蘭之系統性銀行永續債" },
    { region: "台灣 / 亞洲其他 (Asia)", flag: "🇹🇼", weight: "4.5%", desc: "具收益吸引力之優質固定收益與特別股" },
    { region: "現金與衍生性商品預備", flag: "💵", weight: "9.0%", desc: "保持流動性與匯率避險操作" }
  ],
  asset_allocation: [
    { category: "固定收益債券 (Bonds)", icon: "fa-shield-halved", weight: "68.5%", desc: "涵蓋美國非投資等級債、投資級永續債與企業債" },
    { category: "特別股 / 優先證券 (Preferreds)", icon: "fa-gem", weight: "24.0%", desc: "股息優先且固定，波動度低於一般普通股" },
    { category: "股票與基金受益憑證 (Equities)", icon: "fa-chart-line", weight: "4.5%", desc: "配置如柏瑞環球重點股票基金，補充長期資本增值" },
    { category: "現金及貨幣市場工具 (Cash)", icon: "fa-coins", weight: "3.0%", desc: "流動性與配息準備資金" }
  ]
};

let fundData = null;

document.addEventListener('DOMContentLoaded', async () => {
  await loadFundDetails();
  renderQuickMetrics();
  render30DayChartAndTable();
  renderHoldingsTable();
  renderAllocations();
  renderYearlySummary();
  setupTabListeners();
});

async function loadFundDetails() {
  try {
    const res = await fetch('data/fund_details.json');
    if (res.ok) {
      fundData = await res.json();
    } else {
      fundData = fallbackFundDetails;
    }
  } catch (err) {
    fundData = fallbackFundDetails;
  }
}

function renderQuickMetrics() {
  if (!fundData) return;
  const latestNav = fundData.latest_nav || 6.6267;
  const subPrice = fundData.subscription_price || 6.7806;
  const diff = latestNav - subPrice;
  const diffPct = ((diff / subPrice) * 100).toFixed(2);

  document.getElementById('quickLatestNav').textContent = `NT$ ${latestNav.toFixed(4)}`;
  document.getElementById('quickSubPrice').textContent = `NT$ ${subPrice.toFixed(4)}`;

  const capDiffEl = document.getElementById('quickCapitalDiff');
  const capPctEl = document.getElementById('quickCapitalPct');

  if (diff >= 0) {
    capDiffEl.textContent = `+NT$ ${diff.toFixed(4)}`;
    capDiffEl.className = 'metric-value text-emerald';
    capPctEl.className = 'metric-sub text-emerald';
    capPctEl.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> +${diffPct}% 資本溢價`;
  } else {
    capDiffEl.textContent = `-NT$ ${Math.abs(diff).toFixed(4)}`;
    capDiffEl.className = 'metric-value text-rose';
    capPctEl.className = 'metric-sub text-rose';
    capPctEl.innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i> ${diffPct}% 資本價差 (未加回已領配息)`;
  }
}

function render30DayChartAndTable() {
  if (!fundData) return;
  const nav30Data = fundData.nav_30_days || [];
  const labels = nav30Data.map(item => item.date.substring(5)).reverse();
  const navValues = nav30Data.map(item => item.nav).reverse();
  const subPrice = fundData.subscription_price || 6.7806;
  const subPriceLine = labels.map(() => subPrice);

  // Render Line Chart
  const ctx = document.getElementById('nav30ChartPage');
  if (ctx) {
    new Chart(ctx.getContext('2d'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '每日淨值 (TWD)',
            data: navValues,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.25,
            pointRadius: 3.5,
            pointBackgroundColor: '#2563eb'
          },
          {
            label: `帳戶1 申購單價 ($${subPrice})`,
            data: subPriceLine,
            borderColor: '#d97706',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#334155', font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' } }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw} TWD`
            }
          }
        },
        scales: {
          x: { ticks: { color: '#64748b', font: { size: 11 } }, grid: { display: false } },
          y: {
            ticks: { color: '#64748b' },
            grid: { color: '#f1f5f9' }
          }
        }
      }
    });
  }

  // Render Daily Table
  const tbody = document.getElementById('nav30TableBodyPage');
  if (tbody) {
    tbody.innerHTML = '';
    nav30Data.forEach(item => {
      const tr = document.createElement('tr');
      const diffFromSub = (item.nav - subPrice).toFixed(4);
      const diffClass = item.change > 0 ? 'text-emerald' : (item.change < 0 ? 'text-rose' : 'text-secondary');
      const diffSubClass = diffFromSub >= 0 ? 'text-emerald' : 'text-rose';
      const changeStr = item.change > 0 ? `+${item.change.toFixed(4)}` : `${item.change.toFixed(4)}`;

      tr.innerHTML = `
        <td style="font-weight:600;">${item.date}</td>
        <td style="font-weight:700;">$${item.nav.toFixed(4)}</td>
        <td class="${diffClass}" style="font-weight:600;">${changeStr}</td>
        <td class="${diffSubClass}" style="font-weight:700;">${diffFromSub >= 0 ? '+' : ''}${diffFromSub}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

function renderHoldingsTable() {
  if (!fundData || !fundData.top_holdings) return;
  const tbody = document.getElementById('holdingsTableBodyPage');
  if (!tbody) return;
  tbody.innerHTML = '';
  fundData.top_holdings.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:700; color:var(--color-indigo);">${item.rank}</td>
      <td style="font-weight:700;">${item.name}</td>
      <td><span class="badge-tx buy" style="font-size:0.75rem;">${item.type}</span></td>
      <td style="color:var(--text-secondary);">${item.country}</td>
      <td style="font-weight:800; text-align:right; color:var(--text-primary);">${item.weight}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderAllocations() {
  if (!fundData) return;

  // Region
  const regionContainer = document.getElementById('regionListContainerPage');
  if (regionContainer && fundData.regions) {
    regionContainer.innerHTML = '';
    fundData.regions.forEach(item => {
      const pct = parseFloat(item.weight);
      const div = document.createElement('div');
      div.style.padding = '12px 16px';
      div.style.background = 'var(--bg-subtle)';
      div.style.borderRadius = 'var(--radius-md)';
      div.style.border = '1px solid var(--border-color)';
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.88rem;">
          <span style="font-weight:700;">${item.flag} ${item.region}</span>
          <span style="font-weight:800; color:var(--color-indigo);">${item.weight}</span>
        </div>
        <div class="alloc-bar-bg">
          <div class="alloc-bar-fill" style="width: ${pct}%; background: var(--color-indigo);"></div>
        </div>
        <div style="font-size:0.78rem; color:var(--text-muted); margin-top:4px;">${item.desc}</div>
      `;
      regionContainer.appendChild(div);
    });
  }

  // Asset Class
  const assetContainer = document.getElementById('assetClassContainerPage');
  if (assetContainer && fundData.asset_allocation) {
    assetContainer.innerHTML = '';
    fundData.asset_allocation.forEach(item => {
      const pct = parseFloat(item.weight);
      const div = document.createElement('div');
      div.style.padding = '12px 16px';
      div.style.background = 'var(--bg-subtle)';
      div.style.borderRadius = 'var(--radius-md)';
      div.style.border = '1px solid var(--border-color)';
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.88rem;">
          <span style="font-weight:700;"><i class="fa-solid ${item.icon}" style="color:var(--color-gold); margin-right:6px;"></i>${item.category}</span>
          <span style="font-weight:800; color:var(--color-gold);">${item.weight}</span>
        </div>
        <div class="alloc-bar-bg">
          <div class="alloc-bar-fill" style="width: ${pct}%; background: var(--color-gold);"></div>
        </div>
        <div style="font-size:0.78rem; color:var(--text-muted); margin-top:4px;">${item.desc}</div>
      `;
      assetContainer.appendChild(div);
    });
  }
}

function renderYearlySummary() {
  if (!fundData || !fundData.yearly_nav_summary) return;
  const tbody = document.getElementById('historyTableBodyPage');
  if (!tbody) return;
  tbody.innerHTML = '';
  fundData.yearly_nav_summary.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:800; color:var(--color-indigo);">${item.year}</td>
      <td style="font-weight:700;">${item.nav_range}</td>
      <td><span class="badge-tx dividend" style="font-size:0.75rem;">${item.dividend_note}</span></td>
      <td style="color:var(--text-secondary); font-size:0.85rem;">${item.description}</td>
    `;
    tbody.appendChild(tr);
  });
}

function setupTabListeners() {
  const tabBtns = document.querySelectorAll('.fund-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.fund-tab-content').forEach(content => {
        content.classList.remove('active');
      });

      if (targetTab === 'nav30') document.getElementById('fundTabNav30').classList.add('active');
      if (targetTab === 'holdings') document.getElementById('fundTabHoldings').classList.add('active');
      if (targetTab === 'allocation') document.getElementById('fundTabAllocation').classList.add('active');
      if (targetTab === 'history') document.getElementById('fundTabHistory').classList.add('active');
    });
  });
}
