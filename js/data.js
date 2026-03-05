const marketData = {
  "US": {
    "NASDAQ 100": ["AAPL", "MSFT", "AMZN", "NVDA", "GOOGL", "GOOG", "META", "TSLA", "AVGO", "COST", "NFLX", "AMD", "ADBE", "INTC", "CSCO", "TMUS", "QCOM", "TXN", "AMAT", "ISRG", "INTU", "HON", "AMGN", "VRTX", "SBUX", "ADP", "BKNG", "GILD", "MDLZ", "REGN", "ADI", "LRCX", "MU", "VRSK", "PANW", "SNPS", "CDNS", "PYPL", "MAR", "PDD", "ORLY", "CSX", "NXPI", "MELI", "ASML", "MNST", "CTAS", "KLAC", "FTNT", "KDP", "LULU", "AEP", "PAYX", "IDXX", "DXCM", "ADSK", "CPRT", "MCHP", "CHTR", "CSGP", "ODFL", "KLA", "AZN", "EXC", "PCAR", "BIIB", "WDAY", "MRVL", "ROST", "GILD", "ON", "MRNA", "GFS", "DATADOG", "TEAM", "MDB", "DDOG", "ZS", "CRWD", "OKTA", "NET"],
    "S&P 500": ["JPM", "UNH", "V", "WMT", "XOM", "MA", "PG", "HD", "BAC", "CVX", "LLY", "KO", "ORCL", "PFE", "GE", "ABBV", "PEP", "COST", "TMO", "AVGO", "DHR", "MCD", "DIS", "ACN", "ABT", "LIN", "PM", "ADBE", "CRM", "VZ", "CSCO", "NKE", "INTC", "UPS", "NEE", "MS", "RTX", "LOW", "AMD", "T", "HON", "COP", "CAT", "PGR", "AXP", "IBM", "AMAT", "INTU", "SPGI", "QCOM", "BKNG", "PLD", "BLK", "SYK", "TJX", "DE", "GEHC", "NOW", "C", "BA", "ISRG", "LMT", "LRCX", "GILD", "AMGN", "ELV", "TGT", "ZTS", "MDT", "ADP", "MU", "HCA", "BSX", "CVS", "FISV", "CI", "VRTX", "STZ", "CB", "REGN", "BDX", "ADI", "ITW", "WM", "EOG", "EW", "SO", "SLB", "CL", "ICE", "NOC", "HUM", "AON", "MPC", "MMC", "MCK", "APD", "PH", "D"],
    "Dow 30": ["AAPL", "AMGN", "AXP", "BA", "CAT", "CRM", "CSCO", "CVX", "DIS", "GS", "HD", "HON", "IBM", "INTC", "JNJ", "JPM", "KO", "MCD", "MMM", "MSFT", "NKE", "PG", "TRV", "UNH", "V", "VZ", "WBA", "WMT"]
  },
  "Europe": {
    "FTSE 100": ["HSBA.L", "SHEL.L", "BP.L", "AZN.L", "ULVR.L", "BARC.L", "GSK.L", "RIO.L", "DGE.L", "REL.L", "GLEN.L", "VOD.L", "LLOY.L", "PRU.L", "AAL.L", "TSCO.L", "LSEG.L", "NWG.L", "CPG.L", "BATS.L"],
    "DAX 40": ["SAP.DE", "SIE.DE", "AIR.DE", "ADS.DE", "VOW3.DE", "ALV.DE", "BAYN.DE", "BMW.DE", "DTE.DE", "MBG.DE", "IFX.DE", "BAS.DE", "MUV2.DE", "RWE.DE", "DHL.DE", "BEI.DE", "DB1.DE", "HEN3.DE", "LIN.DE", "PAH3.DE"],
    "CAC 40": ["MC.PA", "OR.PA", "TTE.PA", "AIR.PA", "RMS.PA", "ASML.AS", "SAN.PA", "BNP.PA", "SU.PA", "EL.PA", "KER.PA", "DG.PA", "VIV.PA", "GLE.PA", "CA.PA", "ACA.PA", "STLAP.PA", "ML.PA", "OR.PA", "VIE.PA"]
  },
  "Asia-Pacific": {
    "Nikkei 225": ["7203.T", "9984.T", "6758.T", "8031.T", "9983.T", "6861.T", "6098.T", "4063.T", "8058.T", "8306.T", "6723.T", "6501.T", "6367.T", "7741.T", "4502.T", "6954.T", "4519.T", "6902.T", "2914.T", "8316.T"],
    "Hang Seng": ["0700.HK", "9988.HK", "1299.HK", "0005.HK", "3690.HK", "0939.HK", "2318.HK", "1398.HK", "3988.HK", "3968.HK", "0016.HK", "0002.HK", "1113.HK", "0003.HK", "0011.HK", "0823.HK", "0066.HK", "0027.HK", "1928.HK", "0001.HK"],
    "Nifty 50": ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS", "HINDUNILVR.NS", "ITC.NS", "SBIN.NS", "BHARTIARTL.NS", "KOTAKBANK.NS", "LT.NS", "AXISBANK.NS", "ASIANPAINT.NS", "MARUTI.NS", "TITAN.NS", "BAJFINANCE.NS", "HCLTECH.NS", "SUNPHARMA.NS", "ADANIENT.NS", "M&M.NS", "ULTRACEMCO.NS", "TATASTEEL.NS", "NTPC.NS", "POWERGRID.NS", "INDUSINDBK.NS", "BAJAJFINSV.NS", "NESTLEIND.NS", "GRASIM.NS", "JSWSTEEL.NS", "TECHM.NS", "ADANIPORTS.NS", "HINDALCO.NS", "CIPLA.NS", "BRITANNIA.NS", "SBILIFE.NS", "DRREDDY.NS", "COALINDIA.NS", "TATACONSUM.NS", "APOLLOHOSP.NS", "EICHERMOT.NS", "DIVISLAB.NS", "BAJAJ-AUTO.NS", "HEROMOTOCO.NS", "BPCL.NS", "ONGC.NS", "UPL.NS", "WIPRO.NS", "HDFCLIFE.NS", "TATASTEEL.NS", "LTIM.NS"]
  },
  "Americas": {
    "TSX 60": ["RY.TO", "TD.TO", "SHOP.TO", "CNR.TO", "CP.TO", "BMO.TO", "BN.TO", "CNQ.TO", "ENB.TO", "TRI.TO", "BNS.TO", "CSX.TO", "ATD.TO", "TRP.TO", "ABX.TO", "IVN.TO", "CSX.TO", "MFC.TO", "PPL.TO", "WCN.TO"],
    "Bovespa": ["VALE3.SA", "PETR4.SA", "ITUB4.SA", "BBDC4.SA", "ABEV3.SA", "B3SA3.SA", "BBAS3.SA", "WEGE3.SA", "JBSS3.SA", "SUZB3.SA", "RENT3.SA", "LREN3.SA", "GGBR4.SA", "CSAN3.SA", "RAIL3.SA", "ELET3.SA", "VBBR3.SA", "RADL3.SA", "EQTL3.SA", "HAPV3.SA"]
  }
};
