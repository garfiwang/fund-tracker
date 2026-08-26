/**
 * Client WANG Portfolio Dashboard Logic
 * Fund Tracker
 */

let portfolioData = null;
let allianzData = null;
let pinebridgeData = null;
let portfolioChart = null;
let navChart = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 1. Fetch JSON Data
    const [portfolioRes, allianzRes, pbRes] = await Promise.all([
      fetch('data/wang_portfolio.json'),
      fetch('data/allianz_income_growth_details.json'),
      fetch('data/pinebridge_preferred_income_details.json')
    ]);

    portfolioData = await portfolioRes.json();
    allianzData = await allianzRes.json();
    pinebridgeData = await pbRes.json();

    // 2. Render Overview Cards & Data
    renderKPIs();
    renderFundCards();
    
    // 3. Render Charts
    renderPortfolioGrowthChart();
    renderNavComparisonChart();

  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
});

/**
 * Render Top KPI Cards
 */
function renderKPIs(allianzWeight = 0.70) {
  const pbWeight = 1.0 - allianzWeight;
  const initialCapital = portfolioData.initial_capital_twd; // 3,000,000
  
  const allianzHolding = portfolioData.holdings.find(h => h.fund_code === 'ALLIANZ_INCOME_GROWTH');
  const pbHolding = portfolioData.holdings.find(h => h.fund_code === 'PINEBRIDGE_PREFERRED_INCOME');

  // Calculate under current weights (70% Allianz, 30% PineBridge)
  const allianzAllocated = initialCapital * allianzWeight; // 2,100,000
  const pbAllocated = initialCapital * pbWeight; // 900,000

  const allianzUnits = allianzAllocated / allianzHolding.purchase_nav; // 234,636.87
  const pbUnits = pbAllocated / pbHolding.purchase_nav; // 119,016.13

  const allianzCurrValue = allianzUnits * allianzHolding.latest_nav; // 1,963,910.60
  const pbCurrValue = pbUnits * pbHolding.latest_nav; // 799,407.55

  // Dynamically compute exact total dividends for 100% mathematical consistency across pages
  const allianzTotalDivPerUnit = allianzData.monthly_dividend_history ? allianzData.monthly_dividend_history.reduce((sum, item) => sum + item.per_unit_twd, 0) : 0;
  const pbTotalDivPerUnit = pinebridgeData.monthly_dividend_history ? pinebridgeData.monthly_dividend_history.reduce((sum, item) => sum + item.per_unit_twd, 0) : 0;

  const allianzTotalDiv = allianzTotalDivPerUnit * allianzUnits; // 264,201.11
  const pbTotalDiv = pbTotalDivPerUnit * pbUnits; // 119,016.13

  const totalCurrentValue = allianzCurrValue + pbCurrValue; // 基金純總市值 (2,763,319)
  const totalDividendReceived = allianzTotalDiv + pbTotalDiv; // 累計配息 (383,217)
  const totalAssetValue = totalCurrentValue + totalDividendReceived; // 資產總值 (3,146,536)

  const netTotalProfit = totalAssetValue - initialCapital; // 淨獲利 (+145,128)
  const netTotalROI = (netTotalProfit / initialCapital) * 100; // 含息總 ROI (+4.84%)

  // Monthly & Annualized Estimated Cash Flow (Direct Units * Per-Unit Dividend)
  const allianzLatestPerUnitDiv = 0.0590; // 最新每單位配息 (TWD)
  const pbLatestPerUnitDiv = 0.0500; // 最新每單位配息 (TWD)

  const monthlyEstDividend = (allianzUnits * allianzLatestPerUnitDiv) + (pbUnits * pbLatestPerUnitDiv); // 19,794.39 / 月
  const annualEstDividend = monthlyEstDividend * 12; // 237,532.68 / 年

  // Update UI Elements
  document.getElementById('initialCapitalText').textContent = `NT$ ${initialCapital.toLocaleString()}`;
  document.getElementById('totalCurrentValueText').textContent = `NT$ ${Math.round(totalAssetValue).toLocaleString()}`;
  document.getElementById('capitalGainText').textContent = `市值 NT$ ${Math.round(totalCurrentValue).toLocaleString()} ＋ 配息 NT$ ${Math.round(totalDividendReceived).toLocaleString()} (${netTotalProfit >= 0 ? '+' : ''}NT$ ${Math.round(netTotalProfit).toLocaleString()} / ${netTotalROI.toFixed(2)}%)`;
  
  document.getElementById('totalDividendText').textContent = `NT$ ${Math.round(totalDividendReceived).toLocaleString()}`;
  document.getElementById('totalROIText').textContent = `${netTotalROI >= 0 ? '+' : ''}${netTotalROI.toFixed(2)}%`;
  document.getElementById('totalReturnAmountText').textContent = `獲利小計 +NT$ ${Math.round(netTotalProfit).toLocaleString()}`;

  document.getElementById('monthlyEstDivText').textContent = `NT$ ${Math.round(monthlyEstDividend).toLocaleString()} / 月`;
  document.getElementById('annualEstDivText').textContent = `依最新息率預估年領 NT$ ${Math.round(annualEstDividend).toLocaleString()}`;
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

  // PineBridge Card
  document.getElementById('pbNav').textContent = `${pinebridgeData.latest_nav.toFixed(4)} TWD`;
  document.getElementById('pbNavDate').textContent = `淨值日期: ${pinebridgeData.latest_nav_date}`;
  document.getElementById('pbYield').textContent = pinebridgeData.estimated_annual_yield;

  const pbHoldingsList = document.getElementById('pbHoldingsList');
  pbHoldingsList.innerHTML = pinebridgeData.top_holdings.map(h => `
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
  const pbNavs = portfolioData.history.map(item => item.pinebridge_nav);

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
          label: '柏瑞多重資產特別收益-B (TWD)',
          data: pbNavs,
          borderColor: '#059669',
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
          suggestedMin: 6.0,
          suggestedMax: 10.5,
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
