// Global variables
let currentPage = 'home';
let currentCompany = null;
let filteredStocks = [...stockData];
let currentPageNum = 1;
const itemsPerPage = 10;
let sortColumn = null;
let sortDirection = 'asc';
let currentChart = null;
let currentRatiosChart = null;
let currentPortfolioChart = null;

// Page navigation
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page === 'home' ? 'homepage' : page + '-page').classList.add('active');
    currentPage = page;
    
    if (page === 'screens') {
        loadScreensPage();
    } else if (page === 'portfolio') {
        loadPortfolioPage();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupSearch();
    setupChatbot();
    loadScreensPage();
    loadPortfolioPage();
    
    // Ensure search input exists and is focused
    const searchInput = document.getElementById('company-search');
    if (searchInput) {
        searchInput.focus();
        console.log('Search input initialized');
    }
});

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('company-search');
    const dropdown = document.getElementById('search-dropdown');
    
    if (!searchInput || !dropdown) {
        console.error('Search elements not found');
        return;
    }
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        console.log('Search query:', query);
        
        if (query.length === 0) {
            dropdown.style.display = 'none';
            return;
        }
        
        const matches = companies.filter(company => 
            company.name.toLowerCase().includes(query) || 
            company.ticker.toLowerCase().includes(query)
        );
        
        console.log('Matches found:', matches.length);
        
        if (matches.length > 0) {
            dropdown.innerHTML = matches.map(company => `
                <div class="search-item" onclick="selectCompany('${company.ticker}')">
                    <div>
                        <div class="search-item-name">${company.name}</div>
                        <div class="search-item-ticker">${company.ticker}</div>
                    </div>
                    <div class="price">₹${company.price.toFixed(2)}</div>
                </div>
            `).join('');
            dropdown.style.display = 'block';
        } else {
            dropdown.innerHTML = '<div class="search-item">No companies found</div>';
            dropdown.style.display = 'block';
        }
    });
    
    // Add keydown event for Enter key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.toLowerCase().trim();
            const matches = companies.filter(company => 
                company.name.toLowerCase().includes(query) || 
                company.ticker.toLowerCase().includes(query)
            );
            if (matches.length > 0) {
                selectCompany(matches[0].ticker);
            }
        }
    });
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            dropdown.style.display = 'none';
        }
    });
    
    console.log('Search functionality initialized');
}

// Company selection
function selectCompany(ticker) {
    console.log('Selecting company:', ticker);
    currentCompany = ticker;
    const company = companies.find(c => c.ticker === ticker);
    
    if (company) {
        console.log('Company found:', company.name);
        // Update company page with data
        document.getElementById('company-name').textContent = company.name;
        document.getElementById('company-ticker').textContent = company.ticker;
        document.getElementById('company-price').textContent = `₹${company.price.toFixed(2)}`;
        
        const changeElement = document.getElementById('company-change');
        changeElement.textContent = `${company.change > 0 ? '+' : ''}${company.change.toFixed(2)}%`;
        changeElement.className = `change ${company.change >= 0 ? 'positive' : 'negative'}`;
        
        // Load financial data
        loadCompanyFinancials(ticker);
        
        // Show company page
        showPage('company');
        
        // Hide search dropdown
        document.getElementById('search-dropdown').style.display = 'none';
        document.getElementById('company-search').value = '';
    } else {
        console.error('Company not found:', ticker);
    }
}

// Load company financial data
function loadCompanyFinancials(ticker) {
    const data = financialData[ticker];
    
    if (data) {
        // Update key metrics
        document.getElementById('market-cap').textContent = data.keyMetrics.marketCap;
        document.getElementById('pe-ratio').textContent = data.keyMetrics.pe;
        document.getElementById('roe').textContent = data.keyMetrics.roe;
        document.getElementById('debt-equity').textContent = data.keyMetrics.debtEquity;
        document.getElementById('revenue').textContent = data.keyMetrics.revenue;
        document.getElementById('net-profit').textContent = data.keyMetrics.netProfit;
        
        // Load P&L data
        loadFinancialTable('profit-loss-data', data.profitLoss);
        
        // Load Balance Sheet data
        loadFinancialTable('balance-sheet-data', data.balanceSheet);
        
        // Load Cash Flow data
        loadFinancialTable('cash-flow-data', data.cashFlow);
        
        // Load charts
        loadPriceChart(ticker, '1M');
        loadRatiosChart(ticker);
        loadPeerComparison(ticker);
    }
}

// Load price chart
function loadPriceChart(ticker, period) {
    const company = companies.find(c => c.ticker === ticker);
    if (!company || !company.priceHistory) return;
    
    const ctx = document.getElementById('price-chart');
    if (!ctx) return;
    
    const data = company.priceHistory[period] || company.priceHistory['1M'];
    
    // Destroy existing chart
    if (currentChart) {
        currentChart.destroy();
    }
    
    // Update active button
    document.querySelectorAll('.chart-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="loadChart('${period}')"]`)?.classList.add('active');
    
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.date),
            datasets: [{
                label: 'Price',
                data: data.map(d => d.price),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: '#f3f4f6'
                    }
                }
            },
            elements: {
                point: {
                    radius: 0,
                    hoverRadius: 4
                }
            }
        }
    });
}

// Load ratios chart
function loadRatiosChart(ticker) {
    const ctx = document.getElementById('ratios-chart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (currentRatiosChart) {
        currentRatiosChart.destroy();
    }
    
    // Generate dummy historical ratios data
    const years = ['2020', '2021', '2022', '2023', '2024'];
    const stock = stockData.find(s => s.ticker === ticker);
    
    if (!stock) return;
    
    const peData = years.map((_, i) => stock.pe + (Math.random() - 0.5) * 5);
    const roeData = years.map((_, i) => stock.roe + (Math.random() - 0.5) * 8);
    
    currentRatiosChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'P/E Ratio',
                data: peData,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                yAxisID: 'y'
            }, {
                label: 'ROE (%)',
                data: roeData,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: '#f3f4f6'
                    },
                    title: {
                        display: true,
                        text: 'P/E Ratio'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                    },
                    title: {
                        display: true,
                        text: 'ROE (%)'
                    }
                }
            }
        }
    });
}

// Load peer comparison
function loadPeerComparison(ticker) {
    const currentStock = stockData.find(s => s.ticker === ticker);
    if (!currentStock) return;
    
    // Find peers in the same sector
    const peers = stockData
        .filter(s => s.sector === currentStock.sector && s.ticker !== ticker)
        .slice(0, 4);
    
    // Add current company to comparison
    const comparisonData = [currentStock, ...peers];
    
    const tbody = document.getElementById('peer-comparison-data');
    if (!tbody) return;
    
    tbody.innerHTML = comparisonData.map((stock, index) => `
        <tr class="${index === 0 ? 'current-company' : ''}" onclick="selectCompany('${stock.ticker}')">
            <td class="company-cell">${stock.name}${index === 0 ? ' (Current)' : ''}</td>
            <td class="number-cell">₹${(stock.marketCap / 100).toFixed(0)} Cr</td>
            <td class="number-cell">${stock.pe.toFixed(1)}</td>
            <td class="number-cell">${stock.roe.toFixed(1)}%</td>
            <td class="number-cell ${stock.salesGrowth > 15 ? 'positive' : stock.salesGrowth < 5 ? 'negative' : ''}">${stock.salesGrowth.toFixed(1)}%</td>
            <td class="number-cell">${(Math.random() * 0.8 + 0.1).toFixed(2)}</td>
        </tr>
    `).join('');
}

// Chart period selector
function loadChart(period) {
    if (currentCompany) {
        loadPriceChart(currentCompany, period);
    }
}

// Portfolio page functionality
function loadPortfolioPage() {
    if (currentPage === 'portfolio') {
        loadPortfolioChart();
        loadHoldingsData();
    }
}

// Load portfolio chart
function loadPortfolioChart() {
    const ctx = document.getElementById('portfolio-chart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (currentPortfolioChart) {
        currentPortfolioChart.destroy();
    }
    
    const data = portfolioData.performance;
    
    currentPortfolioChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.date),
            datasets: [{
                label: 'Portfolio Value',
                data: data.map(d => d.price),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: '#f3f4f6'
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value / 100000).toFixed(1) + 'L';
                        }
                    }
                }
            },
            elements: {
                point: {
                    radius: 0,
                    hoverRadius: 4
                }
            }
        }
    });
}

// Load holdings data
function loadHoldingsData() {
    const tbody = document.getElementById('holdings-data');
    if (!tbody) return;
    
    tbody.innerHTML = portfolioData.holdings.map(holding => {
        const currentValue = holding.qty * holding.currentPrice;
        const investedValue = holding.qty * holding.avgPrice;
        const pnl = currentValue - investedValue;
        const pnlPercent = (pnl / investedValue) * 100;
        
        return `
            <tr onclick="selectCompany('${holding.ticker}')">
                <td class="company-cell">${holding.name}</td>
                <td class="number-cell">${holding.qty}</td>
                <td class="number-cell">₹${holding.avgPrice.toFixed(2)}</td>
                <td class="number-cell">₹${holding.currentPrice.toFixed(2)}</td>
                <td class="number-cell ${pnl >= 0 ? 'positive' : 'negative'}">
                    ₹${pnl.toFixed(0)} (${pnlPercent.toFixed(1)}%)
                </td>
                <td class="number-cell">${holding.weight.toFixed(1)}%</td>
            </tr>
        `;
    }).join('');
}

// Load financial table data
function loadFinancialTable(tableId, data) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = data.map(row => `
        <tr>
            <td style="font-weight: 600;">${row.item}</td>
            <td class="number-cell">${formatNumber(row[2024])}</td>
            <td class="number-cell">${formatNumber(row[2023])}</td>
            <td class="number-cell">${formatNumber(row[2022])}</td>
            <td class="number-cell">${formatNumber(row[2021])}</td>
            <td class="number-cell">${formatNumber(row[2020])}</td>
        </tr>
    `).join('');
}

// Format numbers for display
function formatNumber(num) {
    if (num < 0) {
        return `-₹${Math.abs(num / 100).toFixed(0)} Cr`;
    } else if (num >= 10000) {
        return `₹${(num / 100).toFixed(0)} Cr`;
    } else if (num >= 1000) {
        return `₹${(num).toFixed(0)} Cr`;
    } else {
        return `₹${num.toFixed(2)}`;
    }
}

// Tab switching
function showTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

// Screens page functionality
function loadScreensPage() {
    if (currentPage === 'screens') {
        displayStocks(stockData);
    }
}

// Apply preset filters
function applyPresetFilter(filterType) {
    let filtered = [];
    let title = '';
    
    switch (filterType) {
        case 'high-growth':
            filtered = stockData.filter(stock => stock.growth > 15);
            title = 'High Growth Stocks';
            break;
        case 'low-pe':
            filtered = stockData.filter(stock => stock.pe < 20);
            title = 'Low PE Stocks';
            break;
        case 'high-dividend':
            filtered = stockData.filter(stock => stock.dividend > 3);
            title = 'High Dividend Stocks';
            break;
        case 'large-cap':
            filtered = stockData.filter(stock => stock.marketCap > 500000);
            title = 'Large Cap Stocks';
            break;
        default:
            filtered = stockData;
            title = 'All Stocks';
    }
    
    filteredStocks = filtered;
    currentPageNum = 1;
    document.getElementById('results-title').textContent = title;
    displayStocks(filtered);
}

// Apply custom filter
function applyCustomFilter() {
    const query = document.getElementById('custom-query').value.trim();
    
    if (!query) {
        applyPresetFilter('all');
        return;
    }
    
    try {
        const filtered = stockData.filter(stock => {
            return evaluateQuery(query, stock);
        });
        
        filteredStocks = filtered;
        currentPageNum = 1;
        document.getElementById('results-title').textContent = 'Custom Filter Results';
        displayStocks(filtered);
    } catch (error) {
        alert('Invalid query. Please check your syntax.');
    }
}

// Simple query evaluator
function evaluateQuery(query, stock) {
    // Replace field names with actual values
    let evalQuery = query
        .replace(/MarketCap/gi, stock.marketCap)
        .replace(/PE/gi, stock.pe)
        .replace(/ROE/gi, stock.roe)
        .replace(/Price/gi, stock.price)
        .replace(/Dividend/gi, stock.dividend)
        .replace(/Growth/gi, stock.growth)
        .replace(/Volume/gi, stock.volume)
        .replace(/AND/gi, '&&')
        .replace(/OR/gi, '||');
    
    try {
        return eval(evalQuery);
    } catch (e) {
        return false;
    }
}

// Display stocks in table
function displayStocks(stocks) {
    const tbody = document.getElementById('stock-table-body');
    const totalPages = Math.ceil(stocks.length / itemsPerPage);
    const startIndex = (currentPageNum - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageStocks = stocks.slice(startIndex, endIndex);
    
    tbody.innerHTML = pageStocks.map(stock => `
        <tr onclick="selectCompany('${stock.ticker}')">
            <td class="company-cell">${stock.name}</td>
            <td class="number-cell">₹${(stock.marketCap / 100).toFixed(0)} Cr</td>
            <td class="number-cell">${stock.pe.toFixed(1)}</td>
            <td class="number-cell">${stock.roe.toFixed(1)}%</td>
            <td class="number-cell">₹${stock.price.toFixed(2)}</td>
        </tr>
    `).join('');
    
    // Update pagination
    document.getElementById('page-info').textContent = `Page ${currentPageNum} of ${totalPages}`;
    document.getElementById('prev-btn').disabled = currentPageNum === 1;
    document.getElementById('next-btn').disabled = currentPageNum === totalPages;
    
    // Update results count
    document.getElementById('results-count').textContent = `${stocks.length} companies found`;
}

// Pagination
function nextPage() {
    const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
    if (currentPageNum < totalPages) {
        currentPageNum++;
        displayStocks(filteredStocks);
    }
}

function previousPage() {
    if (currentPageNum > 1) {
        currentPageNum--;
        displayStocks(filteredStocks);
    }
}

// Table sorting
function sortTable(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }
    
    filteredStocks.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];
        
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    // Update sort indicators
    document.querySelectorAll('.stock-table th i').forEach(icon => {
        icon.className = 'fas fa-sort';
    });
    
    const currentHeader = document.querySelector(`th[onclick="sortTable('${column}')"] i`);
    currentHeader.className = `fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`;
    
    displayStocks(filteredStocks);
}

// Chatbot functionality
function setupChatbot() {
    // Initially collapsed
    document.getElementById('chatbot-widget').classList.add('collapsed');
}

function toggleChatbot() {
    const widget = document.getElementById('chatbot-widget');
    widget.classList.toggle('collapsed');
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatbot-input-field');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage(response, 'bot');
    }, 500);
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const icon = sender === 'bot' ? 'fa-robot' : 'fa-user';
    messageDiv.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for specific keywords
    for (const [key, response] of Object.entries(chatbotResponses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    // Generic responses for other queries
    const genericResponses = [
        "That's an interesting question! For detailed financial analysis, I recommend looking at the company's financial statements and key ratios.",
        "I can help you understand various financial metrics. Try asking about PE ratio, ROE, market cap, or other financial terms.",
        "Financial analysis involves looking at multiple factors. Consider examining the company's revenue growth, profitability ratios, and debt levels.",
        "For investment decisions, it's important to analyze both quantitative metrics and qualitative factors like management quality and industry trends.",
        "Stock screening helps identify potential investment opportunities. You can use our query builder to filter stocks based on specific criteria.",
        "Understanding financial statements is crucial for stock analysis. The P&L shows profitability, balance sheet shows financial position, and cash flow shows liquidity."
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// Initialize data when page loads
window.addEventListener('load', function() {
    // Load initial screens data
    if (document.getElementById('screens-page')) {
        loadScreensPage();
    }
    
    // Setup search autofocus
    const searchInput = document.getElementById('company-search');
    if (searchInput) {
        searchInput.focus();
    }
});