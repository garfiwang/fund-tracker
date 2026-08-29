/**
 * BlackRock World Mining Fund A2 USD - Research Page Script
 */

let fundData = null;
let navChart = null;

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
    const res = await fetch('data/blackrock_world_mining_details.json');
    if (res.ok) {
      fundData = await res.json();
    }
  } catch (err) {
    console.error('Failed to load blackrock_world_mining_details.json', err);
  }
}

function renderQuickMetrics() {
  if (!fundData) return;
  const latestNav = fundData.latest_nav || 123.4500;
  const subPrice = fundData.subscription_price || 120.5000;
  const diff = latestNav - subPrice;
  const diffPct = ((diff / subPrice) * 100).toFixed(2);

  document.getElementById('quickLatestNav').textContent = `${latestNav.toFixed(4)} USD`;
  document.getElementById('quickSubPrice').textContent = `${subPrice.toFixed(4)} USD`;

  const capDiffEl = document.getElementById('quickCapitalDiff');
  const capPctEl = document.getElementById('quickCapitalPct');

  if (diff >= 0) {
    capDiffEl.textContent = `+${diff.toFixed(4)} USD`;
    capDiffEl.className = 'metric-value text-emerald';
    capPctEl.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> +${diffPct}% 資本溢價`;
    capPctEl.className = 'metric-sub text-emerald';
  } else {
    capDiffEl.textContent = `${diff.toFixed(4)} USD`;
    capDiffEl.className = 'metric-value text-rose';
    capPctEl.innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i> ${diffPct}% 資本折價`;
    capPctEl.className = 'metric-sub text-rose';
  }
}

function render30DayChartAndTable() {
  if (!fundData || !fundData.nav_30_days) return;

  const dataList = fundData.nav_30_days;
  const chronological = [...dataList].reverse();

  const labels = chronological.map(d => d.date.substring(5)); // MM/DD
  const dataPoints = chronological.map(d => d.nav);

  const ctx = document.getElementById('nav30DaysChart').getContext('2d');
  if (navChart) navChart.destroy();

  navChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '基金淨值 (USD)',
        data: dataPoints,
        borderColor: '#b45309',
        backgroundColor: 'rgba(180, 83, 9, 0.08)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.25,
        pointBackgroundColor: '#b45309',
        pointRadius: 3.5,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `淨值: ${ctx.parsed.y.toFixed(4)} USD`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 11, family: 'Plus Jakarta Sans' } }
        },
        y: {
          grid: { color: '#f1f5f9' },
          ticks: {
            font: { size: 11, family: 'Plus Jakarta Sans' },
            callback: (val) => `${val.toFixed(2)} USD`
          }
        }
      }
    }
  });

  // Table
  const tbody = document.getElementById('nav30DaysTableBody');
  tbody.innerHTML = '';

  dataList.forEach(item => {
    const tr = document.createElement('tr');
    const chg = item.change || 0;
    const isUp = chg >= 0;
    const prevNav = item.nav - chg;
    const pct = prevNav !== 0 ? ((chg / prevNav) * 100).toFixed(2) : '0.00';
    const chgClass = isUp ? 'text-emerald' : 'text-rose';
    const chgIcon = isUp ? 'fa-arrow-up' : 'fa-arrow-down';

    tr.innerHTML = `
      <td style="font-weight: 600;">${item.date}</td>
      <td style="font-weight: 700; font-family: 'Plus Jakarta Sans';">${item.nav.toFixed(4)} USD</td>
      <td class="${chgClass}" style="font-weight: 600;">
        <i class="fa-solid ${chgIcon}" style="font-size: 0.75rem;"></i> ${Math.abs(chg).toFixed(4)}
      </td>
      <td class="${chgClass}" style="font-weight: 600;">
        ${isUp ? '+' : ''}${pct}%
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderHoldingsTable() {
  if (!fundData || !fundData.top_holdings) return;
  const tbody = document.getElementById('topHoldingsTableBody');
  tbody.innerHTML = '';

  fundData.top_holdings.forEach(h => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span style="display:inline-block; width:24px; height:24px; border-radius:50%; background:#fef3c7; color:#b45309; text-align:center; line-height:24px; font-weight:800; font-size:0.75rem;">${h.rank}</span></td>
      <td style="font-weight: 700; color: var(--text-primary);">${h.name}</td>
      <td style="color: var(--text-secondary);">${h.type}</td>
      <td style="color: var(--text-secondary);">${h.country || '-'}</td>
      <td style="font-weight: 800; font-family: 'Plus Jakarta Sans'; color: #b45309;">${h.weight}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderAllocations() {
  if (!fundData) return;

  // Metal categories
  if (fundData.asset_allocation) {
    const metalContainer = document.getElementById('metalAllocationsList');
    metalContainer.innerHTML = '';
    fundData.asset_allocation.forEach(a => {
      const card = document.createElement('div');
      card.style.cssText = 'padding: 12px 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">
            <i class="fa-solid ${a.icon || 'fa-cubes'}" style="color: #b45309; margin-right: 6px;"></i> ${a.category}
          </span>
          <span style="font-weight: 800; font-family: 'Plus Jakarta Sans'; color: #b45309;">${a.weight}</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">${a.desc}</p>
      `;
      metalContainer.appendChild(card);
    });
  }

  // Geographic regions
  if (fundData.regions) {
    const regContainer = document.getElementById('regionAllocationsList');
    regContainer.innerHTML = '';
    fundData.regions.forEach(r => {
      const card = document.createElement('div');
      card.style.cssText = 'padding: 12px 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">
            ${r.flag} ${r.region}
          </span>
          <span style="font-weight: 800; font-family: 'Plus Jakarta Sans'; color: #0284c7;">${r.weight}</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">${r.desc}</p>
      `;
      regContainer.appendChild(card);
    });
  }
}

function renderYearlySummary() {
  if (!fundData || !fundData.yearly_nav_summary) return;
  const tbody = document.getElementById('yearlySummaryTableBody');
  tbody.innerHTML = '';

  fundData.yearly_nav_summary.forEach(y => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 800; color: var(--text-primary);">${y.year}</td>
      <td style="font-weight: 700; font-family: 'Plus Jakarta Sans'; color: #b45309;">${y.nav_range}</td>
      <td><span style="background: #e2e8f0; color: #334155; font-size: 0.8rem; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${y.dividend_note}</span></td>
      <td style="font-size: 0.85rem; color: var(--text-secondary);">${y.description}</td>
    `;
    tbody.appendChild(tr);
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('[id^="tabBtn-"]').forEach(el => el.classList.remove('active'));

  const targetTab = document.getElementById(`tab-${tabId}`);
  const targetBtn = document.getElementById(`tabBtn-${tabId}`);

  if (targetTab) targetTab.style.display = 'block';
  if (targetBtn) targetBtn.classList.add('active');
}

function setupTabListeners() {
  // Initial active state is already set on 30days tab
}
