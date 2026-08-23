// 基金追蹤專案 - 5 檔中國地產國企與高股息基金專題腳本

document.addEventListener('DOMContentLoaded', async () => {
  console.log("初始化 6 檔地產國企/高股息與實質收息基金追蹤儀錶板...");

  try {
    // 載入 6 檔基金 JSON 資料
    const [hsbc, fidelity, fuhhwa, jpmorgan, ctbc, amundiReal] = await Promise.all([
      fetch('data/hsbc_china_details.json').then(res => res.json()),
      fetch('data/fidelity_china_details.json').then(res => res.json()),
      fetch('data/fuhhwa_infra_details.json').then(res => res.json()),
      fetch('data/jpmorgan_china_details.json').then(res => res.json()),
      fetch('data/ctbc_00882_details.json').then(res => res.json()),
      fetch('data/amundi_real_income_details.json').then(res => res.json())
    ]);

    const funds = [hsbc, fidelity, fuhhwa, jpmorgan, ctbc, amundiReal];

    // 更新最後更新時間
    const lastUpdateEl = document.getElementById('lastUpdatedText');
    if (lastUpdateEl) {
      lastUpdateEl.textContent = `最新淨值日期: ${hsbc.latest_nav_date || '2026-08-20'}`;
    }

    // 渲染基金動態卡片
    renderFundCards(funds);

    // 渲染淨值比較圖表
    renderNavChart();

  } catch (error) {
    console.error("載入基金資料失敗:", error);
  }
});

function renderFundCards(funds) {
  const container = document.getElementById('fundGridContainer');
  if (!container) return;

  container.innerHTML = funds.map(fund => {
    const isTwd = fund.currency === 'TWD';
    const currSymbol = isTwd ? 'TWD' : 'USD';
    const riskBadgeClass = fund.risk_level.includes('RR5') ? 'badge-rr5' : 'badge-rr4';

    const propHoldingsList = (fund.top_property_soe_holdings || []).map(h => 
      `<li><strong>${h.name}</strong> (${h.type || '地產/基建/實質資產'}): <span class="highlight">${h.weight}</span></li>`
    ).join('');

    const otherHoldingsList = (fund.top_other_holdings || []).map(h => 
      `<span class="tag">${h.name} (${h.weight})</span>`
    ).join(' ');

    return `
      <div class="glass-panel fund-card">
        <div class="fund-card-header">
          <div>
            <h3 class="fund-card-title">${fund.fund_name}</h3>
            <span class="fund-card-sub">代碼/ISIN: ${fund.isin} ｜ ${fund.dividend_frequency || '累積型'}</span>
          </div>
          <span class="risk-badge ${riskBadgeClass}">${fund.risk_level}</span>
        </div>

        <div class="fund-card-nav">
          <span class="nav-label">最新淨值 (${fund.latest_nav_date})</span>
          <span class="nav-val">${fund.latest_nav.toFixed(isTwd ? 4 : 2)} <small>${currSymbol}</small></span>
        </div>

        <div class="fund-card-body">
          <div class="section-title"><i class="fa-solid fa-building-flag"></i> 核心地產/基建與實質資產持股</div>
          <ul class="holdings-list">${propHoldingsList}</ul>

          <div class="section-title" style="margin-top: 12px;"><i class="fa-solid fa-chart-pie"></i> 其他前大重倉持股</div>
          <div class="other-tags">${otherHoldingsList}</div>

          <div class="strategy-box">
            <strong><i class="fa-solid fa-lightbulb"></i> 配置策略重點：</strong><br>
            ${fund.china_soes_property_strategy || fund.strategy}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderNavChart() {
  const ctx = document.getElementById('navTrendChart');
  if (!ctx) return;

  const labels = ['07/20', '07/25', '07/30', '08/05', '08/12', '08/20'];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '東方匯理實質收息多重資產 (TWD)',
          data: [9.82, 9.85, 9.88, 9.90, 9.93, 9.97],
          borderColor: '#9333ea',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          fill: true,
          tension: 0.3
        },
        {
          label: '復華中國基礎建設 (TWD)',
          data: [11.12, 11.20, 11.35, 11.40, 11.50, 11.68],
          borderColor: '#0284c7',
          backgroundColor: 'rgba(2, 132, 199, 0.1)',
          fill: true,
          tension: 0.3
        },
        {
          label: '00882 中信中國高股息 (TWD)',
          data: [11.45, 11.58, 11.70, 11.82, 11.92, 14.96],
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22, 163, 74, 0.1)',
          fill: true,
          tension: 0.3
        },
        {
          label: '滙豐環球中國股票 (USD)',
          data: [52.10, 52.80, 53.20, 53.60, 54.15, 55.20],
          borderColor: '#4f46e5',
          tension: 0.3
        },
        {
          label: '富達中國焦點 (USD)',
          data: [63.20, 63.80, 64.10, 64.50, 65.05, 68.44],
          borderColor: '#d97706',
          tension: 0.3
        },
        {
          label: '摩根中國基金 (USD)',
          data: [48.50, 49.20, 49.80, 50.30, 50.99, 51.35],
          borderColor: '#dc2626',
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          grid: { color: '#f1f5f9' }
        }
      }
    }
  });
}
