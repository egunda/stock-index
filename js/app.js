document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentRegion = 'US';
  let currentIndex = 'NASDAQ 100';
  let currentSector = 'All';
  let currentCurrency = 'local';
  let stockDataCache = {}; // Cache for live data

  // Selectors
  const regionTabs = document.querySelectorAll('.nav-tab');
  const indexTabsContainer = document.getElementById('index-tabs');
  const sectorButtons = document.querySelectorAll('.filter-btn');
  const heatmapGrid = document.getElementById('heatmap-grid');
  const stockCountEl = document.getElementById('stock-count');
  const gainersCountEl = document.getElementById('gainers-count');
  const losersCountEl = document.getElementById('losers-count');
  const neutralCountEl = document.getElementById('neutral-count');
  const currentTimeEl = document.getElementById('current-time');
  const lastUpdatedEl = document.getElementById('last-updated');
  const mainTitleEl = document.getElementById('main-title');
  const tooltip = document.getElementById('tooltip');
  const currencySelect = document.getElementById('currency');
  const refreshBtn = document.getElementById('refresh-btn');

  // Initialization
  async function init() {
    updateTime();
    renderIndexTabs();
    await updateHeatmap(); // Initial fetch and render
    setupEventListeners();

    // Auto refresh every 30 seconds
    setInterval(updateHeatmap, 30000);
    setInterval(updateTime, 1000);
  }

  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    currentTimeEl.textContent = timeStr;
  }

  function updateLastUpdated() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    lastUpdatedEl.textContent = `Updated ${timeStr}`;
  }

  function renderIndexTabs() {
    const indices = Object.keys(marketData[currentRegion] || {});
    indexTabsContainer.innerHTML = '';

    indices.forEach((indexName, i) => {
      const btn = document.createElement('button');
      btn.className = `index-tab ${indexName === currentIndex ? 'active' : ''}`;
      btn.textContent = indexName;
      btn.addEventListener('click', async () => {
        currentIndex = indexName;
        document.querySelectorAll('.index-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        await updateHeatmap();
      });
      indexTabsContainer.appendChild(btn);
    });

    if (!indices.includes(currentIndex)) {
      currentIndex = indices[0];
      const firstTab = indexTabsContainer.querySelector('.index-tab');
      if (firstTab) firstTab.classList.add('active');
    }
  }

  async function fetchLiveData(symbols) {
    if (symbols.length === 0) return [];

    // Batch symbols to avoid long URLs
    const batches = [];
    for (let i = 0; i < symbols.length; i += 50) {
      batches.push(symbols.slice(i, i + 50));
    }

    const allQuotes = [];
    for (const batch of batches) {
      const symbolStr = batch.join(',');
      try {
        const response = await fetch(`api/proxy.php?symbols=${encodeURIComponent(symbolStr)}`);
        const data = await response.json();
        if (data.quoteResponse && data.quoteResponse.result) {
          allQuotes.push(...data.quoteResponse.result);
        }
      } catch (error) {
        console.error('Error fetching batch:', error);
      }
    }
    return allQuotes;
  }

  function formatValue(val) {
    if (val >= 1e12) return (val / 1e12).toFixed(2) + 'T';
    if (val >= 1e9) return (val / 1e9).toFixed(2) + 'B';
    if (val >= 1e6) return (val / 1e6).toFixed(2) + 'M';
    return val ? val.toLocaleString() : 'N/A';
  }

  function getColorClass(change) {
    if (change > 3) return 'card-deep-green';
    if (change > 1) return 'card-light-green';
    if (change > 0) return 'card-soft-green';
    if (change === 0) return 'card-grey';
    if (change > -1) return 'card-soft-red';
    if (change > -3) return 'card-light-red';
    return 'card-deep-red';
  }

  async function updateHeatmap() {
    refreshBtn.classList.add('rotating');
    const symbols = marketData[currentRegion][currentIndex] || [];
    const quotes = await fetchLiveData(symbols);

    // Process and store in cache
    const processedStocks = quotes.map(q => ({
      symbol: q.symbol,
      name: q.longName || q.shortName || q.symbol,
      price: q.regularMarketPrice,
      change: q.regularMarketChangePercent,
      sector: q.sector || 'N/A', // Yahoo Quote doesn't always have sector
      mktCap: formatValue(q.marketCap),
      currency: q.currency,
      fullQuote: q
    }));

    stockDataCache[currentIndex] = processedStocks;
    renderHeatmap();
    refreshBtn.classList.remove('rotating');
  }

  function renderHeatmap() {
    const data = stockDataCache[currentIndex] || [];
    // If sector is 'All', no filter. Otherwise filter.
    // Note: Yahoo quotes often don't have sector, so they might all go to 'N/A'
    const filteredData = currentSector === 'All' ? data : data.filter(s => s.sector === currentSector);

    heatmapGrid.innerHTML = '';
    mainTitleEl.innerHTML = `${currentIndex} <span class="subtitle">REALTIME HEATMAP</span>`;

    let upCount = 0;
    let downCount = 0;
    let neutralCount = 0;

    filteredData.forEach(stock => {
      if (stock.change > 0) upCount++;
      else if (stock.change < 0) downCount++;
      else neutralCount++;

      const card = document.createElement('div');
      card.className = `stock-card ${getColorClass(stock.change)}`;
      card.innerHTML = `
                <div class="stock-symbol">${stock.symbol}</div>
                <div class="stock-name" title="${stock.name}">${stock.name}</div>
                <div class="stock-footer">
                    <div class="stock-price">${currentCurrency === 'usd' ? '$' : (stock.currency || '')} ${stock.price ? stock.price.toFixed(2) : 'N/A'}</div>
                    <div class="stock-change">${stock.change > 0 ? '▲' : '▼'} ${Math.abs(stock.change || 0).toFixed(2)}%</div>
                </div>
            `;

      card.addEventListener('mouseenter', (e) => showTooltip(e, stock));
      card.addEventListener('mousemove', (e) => positionTooltip(e));
      card.addEventListener('mouseleave', hideTooltip);

      heatmapGrid.appendChild(card);
    });

    stockCountEl.textContent = `Showing ${filteredData.length} stocks`;
    gainersCountEl.textContent = upCount;
    losersCountEl.textContent = downCount;
    neutralCountEl.textContent = neutralCount;

    updateLastUpdated();
  }

  function showTooltip(e, stock) {
    tooltip.innerHTML = `
            <div class="tooltip-header">
                <div class="tooltip-symbol">${stock.symbol}</div>
                <div class="tooltip-name">${stock.name}</div>
            </div>
            <div class="tooltip-price">${currentCurrency === 'usd' ? '$' : (stock.currency || '')} ${stock.price ? stock.price.toFixed(2) : 'N/A'}</div>
            <div class="tooltip-row">
                <span class="tooltip-label">Sector</span>
                <span class="tooltip-value">${stock.sector}</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Change %</span>
                <span class="tooltip-value" style="color: ${stock.change >= 0 ? 'var(--light-green)' : 'var(--light-red)'}">${stock.change > 0 ? '+' : ''}${stock.change ? stock.change.toFixed(2) : '0.00'}%</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Market Cap</span>
                <span class="tooltip-value">${stock.mktCap}</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Currency</span>
                <span class="tooltip-value">${stock.currency}</span>
            </div>
        `;
    tooltip.style.display = 'block';
    positionTooltip(e);
  }

  function positionTooltip(e) {
    const x = e.pageX + 20;
    const y = e.pageY + 20;
    const tooltipWidth = 220;
    const screenWidth = window.innerWidth;

    if (x + tooltipWidth > screenWidth) {
      tooltip.style.left = (e.pageX - tooltipWidth - 20) + 'px';
    } else {
      tooltip.style.left = x + 'px';
    }
    tooltip.style.top = y + 'px';
  }

  function hideTooltip() {
    tooltip.style.display = 'none';
  }

  function setupEventListeners() {
    regionTabs.forEach(tab => {
      tab.addEventListener('click', async () => {
        regionTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentRegion = tab.dataset.region;
        renderIndexTabs();
        await updateHeatmap();
      });
    });

    sectorButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sectorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSector = btn.dataset.sector;
        renderHeatmap();
      });
    });

    currencySelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      renderHeatmap();
    });

    refreshBtn.addEventListener('click', async () => {
      await updateHeatmap();
    });
  }

  init();
});
