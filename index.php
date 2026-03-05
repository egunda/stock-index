<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Market Live Heatmap</title>
    <meta name="description" content="Real-time global stock market heatmap. Monitor performance by sector and region.">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="dark-theme">
    <header class="app-header">
        <div class="header-left">
            <div class="logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13.5L9 7.5L13 11.5L21 3.5" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 21H21" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h1 id="main-title">Market <span class="subtitle">REALTIME HEATMAP</span></h1>
            </div>
        </div>
        <div class="header-right">
            <div class="time-container">
                <span id="current-time">00:00:00 AM</span>
                <span id="last-updated">Updated 00:00:00 AM</span>
            </div>
            <div class="currency-selector">
                <label for="currency">Display in</label>
                <select id="currency">
                    <option value="local">Local</option>
                    <option value="usd">USD</option>
                </select>
            </div>
            <button id="refresh-btn" class="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                Refresh
            </button>
        </div>
    </header>

    <nav class="region-nav">
        <div class="tabs-scroll-container">
            <button class="nav-tab active" data-region="US">🌐 US</button>
            <button class="nav-tab" data-region="Europe">🌍 Europe</button>
            <button class="nav-tab" data-region="Asia-Pacific">🌏 Asia-Pacific</button>
            <button class="nav-tab" data-region="Americas">🌎 Americas</button>
        </div>
    </nav>

    <div class="index-nav">
        <div id="index-tabs" class="index-tabs-container">
            <!-- Dynamic indexing buttons go here -->
             <button class="index-tab active">NASDAQ 100</button>
             <button class="index-tab">S&P 500</button>
             <button class="index-tab">Dow 30</button>
        </div>
    </div>

    <div class="controls-legend">
        <div class="legend-scale">
            <span class="legend-label">% Change:</span>
            <div class="scale-item deep-red" title="<-3%">&lt;-3%</div>
            <div class="scale-item light-red" title="-1 to -3%">-1 to -3%</div>
            <div class="scale-item soft-red" title="0 to -1%">0 to -1%</div>
            <div class="scale-item grey" title="~0%">&nbsp;~0%&nbsp;</div>
            <div class="scale-item soft-green" title="0 to +1%">0 to +1%</div>
            <div class="scale-item light-green" title="+1 to +3%">+1 to +3%</div>
            <div class="scale-item deep-green" title=">+3%">&gt;+3%</div>
        </div>
    </div>

    <div class="sector-filters">
        <span class="filter-label">Sector:</span>
        <div id="sector-buttons" class="filter-buttons-container">
            <button class="filter-btn active" data-sector="All">All</button>
            <button class="filter-btn" data-sector="Technology">Technology</button>
            <button class="filter-btn" data-sector="Healthcare">Healthcare</button>
            <button class="filter-btn" data-sector="Financial Services">Financial Services</button>
            <button class="filter-btn" data-sector="Consumer Cyclical">Consumer Cyclical</button>
            <button class="filter-btn" data-sector="Industrials">Industrials</button>
            <button class="filter-btn" data-sector="Energy">Energy</button>
            <button class="filter-btn" data-sector="Communication Services">Communication Services</button>
            <button class="filter-btn" data-sector="Basic Materials">Basic Materials</button>
            <button class="filter-btn" data-sector="Real Estate">Real Estate</button>
            <button class="filter-btn" data-sector="Utilities">Utilities</button>
            <button class="filter-btn" data-sector="Consumer Defensive">Consumer Defensive</button>
        </div>
    </div>

    <div class="status-bar">
        <span id="stock-count">Showing 0 stocks</span>
        <div class="stats">
            <span class="stat up"><span class="arrow">▲</span> <span id="gainers-count">0</span></span>
            <span class="stat down"><span class="arrow">▼</span> <span id="losers-count">0</span></span>
            <span class="stat neutral"><span class="dot">●</span> <span id="neutral-count">0</span></span>
        </div>
    </div>

    <main class="heatmap-container">
        <div id="heatmap-grid" class="heatmap-grid">
            <!-- Stock cards rendered here -->
        </div>
    </main>

    <div id="tooltip" class="stock-tooltip" style="display: none;"></div>

    <footer class="app-footer">
        <p>Created with love</p>
    </footer>

    <!-- Scripts -->
    <script src="js/data.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
