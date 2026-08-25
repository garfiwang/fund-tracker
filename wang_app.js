/**
 * Client WANG Portfolio Dashboard Logic
 * Fund Tracker
 */

let portfolioData = null;
let allianzData = null;
let ctbcData = null;
let portfolioChart = null;
let navChart = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 1. Fetch JSON Data
    const [portfolioRes, allianzRes, ctbcRes] = await Promise.all([
      fetch('data/wang_portfolio.json'),
      fetch('data/allianz_income_growth_details.json'),
      fetch('data/ctbc_tech_trend_details.json')
    ]);

    portfolioData = await portfolioRes.json();
    allianzData = await allianzRes.json();
    ctbcData = await ctbcRes.json();

    // 2. Render Overview Cards & Data
    renderKPIs();
    renderFundCards();
    
    // 3. Initialize Interactive Weight Controller
    initWeightController();

    // 4. Render Charts
    renderPortfolioGrowthChart();
    renderNavComparisonChart();

  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
});

/**
 * Render Top KPI Cards
 */
function renderKPIs(allianzWeight = 0.50) {
  const ctbcWeight = 1.0 - allianzWeight;
  const initialCapital = portfolioData.initial_capital_twd; // 3,000,000
  
  const allianzHolding = portfolioData.holdings.find(h => h.fund_code === 'ALLIANZ_INCOME_GROWTH');
  const ctbcHolding = portfolioData.holdings.find(h => h.fund_code === 'CTBC_TECH_TREND');

  // Calculate under current weights
  const allianzAllocated = initialCapital * allianzWeight;
  const ctbcAllocated = initialCapital * ctbcWeight;

  const allianzUnits = allianzAllocated / allianzHolding.purchase_nav;
  const ctbcUnits = ctbcAllocated / ctbcHolding.purchase_nav;

  const allianzCurrValue = allianzUnits * allianzHolding.latest_nav;
  const ctbcCurrValue = ctbcUnits * ctbcHolding.latest_nav;

  const totalCurrentValue = allianzCurrValue + ctbcCurrValue;
  const totalCapitalGain = totalCurrentValue - initialCapital;
  const capitalGainReturn = (totalCapitalGain / initialCapital) * 100;

  // Dividend estimation (based on months elapsed: 20 months of dividends)
  const monthsElapsed = 20;
  const allianzMonthlyDivRate = allianzHolding.monthly_yield_rate; // 0.0065
  const ctbcMonthlyDivRate = ctbcHolding.monthly_yield_rate; // 0.0055

  const allianzTotalDiv = allianzAllocated * allianzMonthlyDivRate * monthsElapsed;
  const ctbcTotalDiv = ctbcAllocated * ctbcMonthlyDivRate * monthsElapsed;
  const totalDividendReceived = allianzTotalDiv + ctbcTotalDiv;

  const totalReturnValue = totalCapitalGain + totalDividendReceived;
  const totalROI = (totalReturnValue / initialCapital) * 100;

  // Monthly & Annualized Estimated Cash Flow
  const monthlyEstDividend = (allianzCurrValue * allianzMonthlyDivRate) + (ctbcCurrValue * ctbcMonthlyDivRate);
  const annualEstDividend = monthlyEstDividend * 12;

  // Update UI Elements
  document.getElementById('initialCapitalText').textContent = `NT$ ${initialCapital.toLocaleString()}`;
  document.getElementById('totalCurrentValueText').textContent = `NT$ ${Math.round(totalCurrentValue).toLocaleString()}`;
  document.getElementById('capitalGainText').textContent = `${totalCapitalGain >= 0 ? '+' : ''}NT$ ${Math.round(totalCapitalGain).toLocaleString()} (${capitalGainReturn.toFixed(2)}%)`;
  
  document.getElementById('totalDividendText').textContent = `NT$ ${Math.round(totalDividendReceived).toLocaleString()}`;
  document.getElementById('totalROIText').textContent = `${totalROI >= 0 ? '+' : ''}${totalROI.toFixed(2)}%`;
  document.getElementById('totalReturnAmountText').textContent = `獲利小計 +NT$ ${Math.round(totalReturnValue).toLocaleString()}`;

  document.getElementById('monthlyEstDivText').textContent = `NT$ ${Math.round(monthlyEstDividend).toLocaleString()} / 月`;
  document.getElementById('annualEstDivText').textContent = `預估年領 NT$ ${Math.round(annualEstDividend).toLocaleString()}`;

  // Update Allocation breakdown labels
  document.getElementById('allianzAllocText').textContent = `NT$ ${Math.round(allianzCurrValue).toLocaleString()} (${(allianzWeight * 100).toFixed(0)}%)`;
  document.getElementById('ctbcAllocText').textContent = `NT$ ${Math.round(ctbcCurrValue).toLocaleString()} (${(ctbcWeight * 100).toFixed(0)}%)`;
}

/**
 * Initialize Slider Controller for dynamically tweaking allocation weights
 */
function initWeightController() {
  const slider = document.getElementById('allianzSlider');
  const allianzValLabel = document.getElementById('allianzSliderVal');
  const ctbcValLabel = document.getElementById('ctbcSliderVal');

  if (!slider) return;

  slider.addEventListener('input', (e) => {
    const allianzPct = parseInt(e.target.value, 10);
    const ctbcPct = 100 - allianzPct;

    allianzValLabel.textContent = `${allianzPct}%`;
    ctbcValLabel.textContent = `${ctbcPct}%`;

    const allianzWeight = allianzPct / 100;
    renderKPIs(allianzWeight);
  });
}

/**
 * Render Fund Detail Cards
 */
function renderFundCards() {
  // Allianz Card
  document.getElementById('allianzNav').textContent = `${allianzData.latest_nav.toFixed(4)} TWD`;
  document.getElementById('allianzNavDate').textContent = `淨值日期: ${allianzData.latest_nav_date}`;
  document.getElementById('allianzYield').textContent = allianzData.estimated_annual_yield;

  const allianzHoldingsList = document.getElementById('allianzHoldingsList');
  allianzHoldingsList.innerHTML = allianzData.top_holdings.map(h => `
    <li style="margin-bottom: 6px; display: flex; justify-content: space-between;">
      <span><strong>${h.rank}. ${h.name}</strong> <span class="tag">${h.type}</span></span>
      <span class="highlight">${h.weight}</span>
    </li>
  `).join('');

  // CTBC Card
  document.getElementById('ctbcNav').textContent = `${ctbcData.latest_nav.toFixed(4)} TWD`;
  document.getElementById('ctbcNavDate').textContent = `淨值日期: ${ctbcData.latest_nav_date}`;
  document.getElementById('ctbcYield').textContent = ctbcData.estimated_annual_yield;

  const ctbcHoldingsList = document.getElementById('ctbcHoldingsList');
  ctbcHoldingsList.innerHTML = ctbcData.top_holdings.map(h => `
    <li style="margin-bottom: 6px; display: flex; justify-content: space-between;">
      <span><strong>${h.rank}. ${h.name}</strong> <span class="tag">${h.type}</span></span>
      <span class="highlight">${h.weight}</span>
    </li>
  `).join('');
}

/**
 * Render Total Portfolio Growth Chart (Chart.js)
 */
function renderPortfolioGrowthChart() {
  const ctx = document.getElementById('portfolioGrowthChart');
  if (!ctx) return;

  const labels = portfolioData.history.map(item => item.month);
  const values = portfolioData.history.map(item => item.total_value);
  const cumDividends = portfolioData.history.map(item => item.cum_dividend);
  const totalReturnValues = portfolioData.history.map(item => item.total_value + item.cum_dividend);

  if (portfolioChart) portfolioChart.destroy();

  portfolioChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '總資產市值 + 累計配息 (含息總價值)',
          data: totalReturnValues,
          borderColor: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.08)',
          fill: true,
          tension: 0.3,
          borderWidth: 3,
          pointRadius: 3
        },
        {
          label: '投資本金與基金估值 (不含配息)',
          data: values,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.05)',
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 2
        },
        {
          label: '累計已領現金配息 (TWD)',
          data: cumDividends,
          borderColor: '#d97706',
          backgroundColor: 'transparent',
          borderDash: [4, 4],
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 2
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
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: NT$ ${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: function(value) {
              return 'NT$ ' + (value / 10000).toFixed(0) + '萬';
            }
          }
        }
      }
    }
  });
}

/**
 * Render NAV Comparison Chart
 */
function renderNavComparisonChart() {
  const ctx = document.getElementById('navComparisonChart');
  if (!ctx) return;

  const labels = portfolioData.history.map(item => item.month);
  const allianzNavs = portfolioData.history.map(item => item.allianz_nav);
  const ctbcNavs = portfolioData.history.map(item => item.ctbc_nav);

  if (navChart) navChart.destroy();

  navChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '安聯收益成長多重資產 (TWD)',
          data: allianzNavs,
          borderColor: '#0284c7',
          backgroundColor: 'transparent',
          tension: 0.2,
          borderWidth: 2.5
        },
        {
          label: '中國信託科技趨勢多重資產 (TWD)',
          data: ctbcNavs,
          borderColor: '#7c3aed',
          backgroundColor: 'transparent',
          tension: 0.2,
          borderWidth: 2.5
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
        y: {
          suggestedMin: 8.8,
          suggestedMax: 11.0,
          ticks: {
            callback: function(value) {
              return value.toFixed(2) + ' 元';
            }
          }
        }
      }
    }
  });
}
