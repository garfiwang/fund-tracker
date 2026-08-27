/**
 * Nomura Global Multi-Opportunity Fund - Research Page Script
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
    const res = await fetch('data/nomura_multi_details.json');
    if (res.ok) {
      fundData = await res.json();
    }
  } catch (err) {
    console.error('Failed to load nomura_multi_details.json');
  }
}

function renderQuickMetrics() {
  if (!fundData) return;
  const latestNav = fundData.latest_nav || 11.0880;
  const subPrice = fundData.subscription_price || 10.8500;
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
    capPctEl.innerHTML = `<i class="fa-solid fa-arrow-trend-down"></i> ${diffPct}% 資本價差 (未加回配息)`;
  }
}

function render30DayChartAndTable() {
  if (!fundData) return;
  const nav30Data = fundData.nav_30_days || [];
  const labels = nav30Data.map(item => item.date.substring(5)).reverse();
  const navValues = nav30Data.map(item => item.nav).reverse();
  const subPrice = fundData.subscription_price || 10.8500;
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
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.25,
            pointRadius: 3.5,
            pointBackgroundColor: '#8b5cf6'
          },
          {
            label: `對照基準單價 ($${subPrice})`,
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
      <td style="font-weight:700; color:#8b5cf6;">${item.rank}</td>
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
          <span style="font-weight:800; color:#8b5cf6;">${item.weight}</span>
        </div>
        <div class="alloc-bar-bg">
          <div class="alloc-bar-fill" style="width: ${pct}%; background: #8b5cf6;"></div>
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
      <td style="font-weight:800; color:#8b5cf6;">${item.year}</td>
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
