/**
 * Franklin Templeton SinoAm Multi-Asset Income Fund - Research Page Script
 */

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
    const res = await fetch('data/franklin_multi_income_details.json');
    if (res.ok) {
      fundData = await res.json();
    }
  } catch (err) {
    console.error('Failed to load franklin_multi_income_details.json', err);
  }
}

function renderQuickMetrics() {
  if (!fundData) return;
  const latestNav = fundData.latest_nav || 8.4500;
  const subPrice = fundData.subscription_price || 8.5500;
  const diff = latestNav - subPrice;
  const diffPct = ((diff / subPrice) * 100).toFixed(2);

  document.getElementById('quickLatestNav').textContent = `NT$ ${latestNav.toFixed(4)}`;
  document.getElementById('quickSubPrice').textContent = `NT$ ${subPrice.toFixed(4)}`;
  if (document.getElementById('quickNavDate')) {
    document.getElementById('quickNavDate').textContent = `計算日期: ${fundData.latest_nav_date || '2026/09/16'}`;
  }
  if (document.getElementById('quickDividend')) {
    document.getElementById('quickDividend').textContent = `NT$ ${(fundData.latest_dividend_per_unit || 0.072).toFixed(4)}`;
  }

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
    capPctEl.innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i> ${diffPct}% 資本價差 (未加回配息)`;
  }
}

function render30DayChartAndTable() {
  if (!fundData) return;
  const nav30Data = fundData.nav_30_days || [];
  const labels = nav30Data.map(item => item.date.substring(5)).reverse();
  const navValues = nav30Data.map(item => item.nav).reverse();
  const subPrice = fundData.subscription_price || 8.5500;
  const subPriceLine = labels.map(() => subPrice);

  // 1. Render Chart
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
            borderColor: '#0284c7',
            backgroundColor: 'rgba(2, 132, 199, 0.1)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.25,
            pointRadius: 3,
            pointBackgroundColor: '#0284c7'
          },
          {
            label: `申購基準價 (${subPrice.toFixed(4)})`,
            data: subPriceLine,
            borderColor: '#ef4444',
            borderWidth: 1.5,
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
            labels: { font: { size: 12, family: 'Noto Sans TC' } }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: NT$ ${context.parsed.y.toFixed(4)}`;
              }
            }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: {
              callback: function(value) {
                return 'NT$ ' + value.toFixed(2);
              }
            }
          }
        }
      }
    });
  }

  // 2. Render Table
  const tableBody = document.getElementById('nav30TableBodyPage');
  if (tableBody) {
    tableBody.innerHTML = nav30Data.map(row => {
      const diffSub = row.nav - subPrice;
      const diffSubStr = diffSub >= 0 ? `+${diffSub.toFixed(4)}` : `${diffSub.toFixed(4)}`;
      const diffSubColor = diffSub >= 0 ? 'color: #10b981; font-weight: 700;' : 'color: #ef4444; font-weight: 700;';
      const changeColor = row.change > 0 ? 'color: #10b981;' : (row.change < 0 ? 'color: #ef4444;' : 'color: var(--text-secondary);');
      const changePrefix = row.change > 0 ? '+' : '';

      return `
        <tr>
          <td style="font-weight: 600;">${row.date}</td>
          <td style="font-weight: 700; color: #0284c7;">NT$ ${row.nav.toFixed(4)}</td>
          <td style="${changeColor}">${changePrefix}${row.change.toFixed(4)}</td>
          <td style="${diffSubColor}">${diffSubStr}</td>
        </tr>
      `;
    }).join('');
  }
}

function renderHoldingsTable() {
  if (!fundData || !fundData.top_holdings) return;
  const container = document.getElementById('holdingsTableBodyPage');
  if (!container) return;

  container.innerHTML = fundData.top_holdings.map(h => `
    <tr>
      <td style="font-weight: 700; color: var(--color-indigo); text-align: center;">${h.rank}</td>
      <td style="font-weight: 600; color: var(--text-primary);">${h.name}</td>
      <td><span class="holding-tag" style="background: #e0f2fe; color: #0369a1;">${h.type}</span></td>
      <td>${h.country}</td>
      <td style="text-align: right; font-weight: 700; color: #0f172a;">${h.weight}</td>
    </tr>
  `).join('');
}

function renderAllocations() {
  if (!fundData) return;

  // Regions
  const regContainer = document.getElementById('regionListContainerPage');
  if (regContainer && fundData.regions) {
    regContainer.innerHTML = fundData.regions.map(r => `
      <div style="background: white; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-weight: 700; font-size: 0.9rem;">${r.flag} ${r.region}</span>
          <span style="font-weight: 800; color: #0284c7; font-size: 0.95rem;">${r.weight}</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">${r.desc}</p>
      </div>
    `).join('');
  }

  // Asset Allocation
  const assetContainer = document.getElementById('assetClassContainerPage');
  if (assetContainer && fundData.asset_allocation) {
    assetContainer.innerHTML = fundData.asset_allocation.map(a => `
      <div style="background: white; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-weight: 700; font-size: 0.9rem;"><i class="fa-solid ${a.icon}" style="color: var(--color-emerald); margin-right: 6px;"></i>${a.category}</span>
          <span style="font-weight: 800; color: var(--color-emerald); font-size: 0.95rem;">${a.weight}</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">${a.desc}</p>
      </div>
    `).join('');
  }
}

function renderYearlySummary() {
  if (!fundData || !fundData.yearly_nav_summary) return;
  const container = document.getElementById('historyTableBodyPage');
  if (!container) return;

  container.innerHTML = fundData.yearly_nav_summary.map(y => `
    <tr>
      <td style="font-weight: 800; color: var(--color-indigo);">${y.year}</td>
      <td style="font-weight: 700; color: #0284c7;">${y.nav_range}</td>
      <td style="font-weight: 600; color: #15803d;">${y.dividend_note}</td>
      <td style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${y.description}</td>
    </tr>
  `).join('');
}

function setupTabListeners() {
  const tabBtns = document.querySelectorAll('.fund-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.fund-tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = 'fundTab' + btn.getAttribute('data-tab').charAt(0).toUpperCase() + btn.getAttribute('data-tab').slice(1);
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}
