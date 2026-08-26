/**
 * Individual Fund Tracker Logic
 * Renders monthly NAV table, monthly dividend table, cumulative dividend stats, and dual-axis chart.
 */

let fundData = null;
let trendChart = null;

document.addEventListener('DOMContentLoaded', async () => {
  const jsonPath = document.body.getAttribute('data-json-path');
  if (!jsonPath) return;

  try {
    const res = await fetch(jsonPath);
    fundData = await res.json();

    renderOverview();
    renderNavTable();
    renderDividendTable();
    renderHoldings();
    renderDualAxisChart();

  } catch (err) {
    console.error('Failed to load fund detail json:', err);
  }
});

function renderOverview() {
  document.getElementById('fundTitle').textContent = fundData.fund_name;
  document.getElementById('fundIsinB').textContent = `ISIN (B月配): ${fundData.isin_b}`;
  document.getElementById('fundIsinA').textContent = `ISIN (A累積): ${fundData.isin_a}`;
  document.getElementById('latestNavVal').textContent = `${fundData.latest_nav.toFixed(4)} TWD`;
  document.getElementById('latestNavDate').textContent = `更新日期: ${fundData.latest_nav_date}`;
  document.getElementById('estYieldVal').textContent = fundData.estimated_annual_yield;

  if (document.getElementById('strategyDesc')) {
    document.getElementById('strategyDesc').textContent = fundData.strategy_description;
  }

  // Calculate Cumulative Dividend for Client WANG
  let initialCapital = 2100000;
  let purchaseNav = 8.9500;
  if (fundData.fund_code === 'PINEBRIDGE_PREFERRED_INCOME') {
    initialCapital = 900000;
    purchaseNav = 7.5620;
  }
  const units = initialCapital / purchaseNav;

  let totalPerUnitDiv = 0;
  if (fundData.monthly_dividend_history) {
    totalPerUnitDiv = fundData.monthly_dividend_history.reduce((sum, item) => sum + item.per_unit_twd, 0);
  }

  const totalCumDividend = totalPerUnitDiv * units;
  const cumYieldPct = (totalCumDividend / initialCapital) * 100;

  if (document.getElementById('cumDividendVal')) {
    document.getElementById('cumDividendVal').textContent = `NT$ ${Math.round(totalCumDividend).toLocaleString()}`;
  }
  if (document.getElementById('cumDividendYield')) {
    document.getElementById('cumDividendYield').textContent = `累計獲利率 ${cumYieldPct.toFixed(2)}% (基於 NT$ ${(initialCapital / 10000).toFixed(0)}萬 本金)`;
  }
}

function renderNavTable() {
  const tbody = document.getElementById('navHistoryTableBody');
  if (!tbody || !fundData.monthly_nav_history) return;

  tbody.innerHTML = fundData.monthly_nav_history.map((row) => {
    const isNegative = row.change_pct.startsWith('-');
    const badgeColor = isNegative ? 'color: #dc2626; font-weight: 700;' : 'color: #059669; font-weight: 700;';
    return `
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 10px 14px; font-weight: 700;">${row.month}</td>
        <td style="padding: 10px 14px; text-align: right; font-weight: 800; color: #0284c7;">${row.nav.toFixed(4)} TWD</td>
        <td style="padding: 10px 14px; text-align: right; ${badgeColor}">${row.change_pct}</td>
      </tr>
    `;
  }).join('');
}

function renderDividendTable() {
  const tbody = document.getElementById('dividendHistoryTableBody');
  if (!tbody || !fundData.monthly_dividend_history) return;

  let initialCapital = 2100000;
  let purchaseNav = 8.9500;
  if (fundData.fund_code === 'PINEBRIDGE_PREFERRED_INCOME') {
    initialCapital = 900000;
    purchaseNav = 7.5620;
  }
  const units = initialCapital / purchaseNav;

  let runningCumDiv = 0;

  tbody.innerHTML = fundData.monthly_dividend_history.map((row) => {
    const monthlyAmount = row.per_unit_twd * units;
    runningCumDiv += monthlyAmount;

    return `
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 10px 14px; font-weight: 700;">${row.month}</td>
        <td style="padding: 10px 14px; text-align: right; font-weight: 700; color: #d97706;">NT$ ${row.per_unit_twd.toFixed(4)}</td>
        <td style="padding: 10px 14px; text-align: right; font-weight: 800; color: #2563eb;">NT$ ${Math.round(monthlyAmount).toLocaleString()}</td>
        <td style="padding: 10px 14px; text-align: right; font-weight: 800; color: #059669;">NT$ ${Math.round(runningCumDiv).toLocaleString()}</td>
        <td style="padding: 10px 14px; text-align: center; color: var(--text-secondary);">${row.ex_date}</td>
        <td style="padding: 10px 14px; text-align: center; color: var(--text-secondary);">${row.pay_date}</td>
        <td style="padding: 10px 14px; text-align: right; font-weight: 800; color: #7c3aed;">${row.annualized_yield}</td>
      </tr>
    `;
  }).join('');
}

function renderHoldings() {
  const container = document.getElementById('holdingsList');
  if (!container || !fundData.top_holdings) return;

  container.innerHTML = fundData.top_holdings.map(h => `
    <li style="margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 8px 12px; border-radius: 6px;">
      <span><strong>${h.rank}. ${h.name}</strong> <span class="tag">${h.type}</span></span>
      <span class="highlight">${h.weight}</span>
    </li>
  `).join('');
}

function renderDualAxisChart() {
  const ctx = document.getElementById('fundDualAxisChart');
  if (!ctx || !fundData.monthly_nav_history) return;

  const labels = fundData.monthly_nav_history.map(item => item.month);
  const navs = fundData.monthly_nav_history.map(item => item.nav);

  // Map monthly dividend array to align with labels
  const divMap = {};
  if (fundData.monthly_dividend_history) {
    fundData.monthly_dividend_history.forEach(d => {
      divMap[d.month] = d.per_unit_twd;
    });
  }
  const divs = labels.map(m => divMap[m] || 0);

  if (trendChart) trendChart.destroy();

  trendChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: '每月淨值 (TWD)',
          data: navs,
          borderColor: '#0284c7',
          backgroundColor: 'rgba(2, 132, 199, 0.05)',
          fill: true,
          tension: 0.3,
          borderWidth: 3,
          yAxisID: 'yNav'
        },
        {
          type: 'bar',
          label: '每單位配息 (TWD)',
          data: divs,
          backgroundColor: 'rgba(217, 119, 6, 0.75)',
          borderColor: '#d97706',
          borderWidth: 1,
          borderRadius: 4,
          yAxisID: 'yDiv'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { family: 'Noto Sans TC', size: 12, weight: 'bold' } }
        }
      },
      scales: {
        yNav: {
          type: 'linear',
          display: true,
          position: 'left',
          title: { display: true, text: '每月淨值 (元)' },
          suggestedMin: Math.min(...navs) * 0.95,
          suggestedMax: Math.max(...navs) * 1.05
        },
        yDiv: {
          type: 'linear',
          display: true,
          position: 'right',
          title: { display: true, text: '每單位配息 (元)' },
          grid: { drawOnChartArea: false },
          suggestedMin: 0,
          suggestedMax: Math.max(...divs) * 1.3
        }
      }
    }
  });
}
