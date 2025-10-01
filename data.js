// Dummy company data
const companies = [
    { name: "Reliance Industries", ticker: "RELIANCE", price: 2856.75, change: 2.34, sector: "Energy", marketCap: 1932456 },
    { name: "Tata Consultancy Services", ticker: "TCS", price: 3834.50, change: -1.23, sector: "IT", marketCap: 1398765 },
    { name: "HDFC Bank", ticker: "HDFCBANK", price: 1667.25, change: 0.89, sector: "Banking", marketCap: 1234567 },
    { name: "Infosys", ticker: "INFY", price: 1489.40, change: 1.56, sector: "IT", marketCap: 654321 },
    { name: "ITC Limited", ticker: "ITC", price: 456.75, change: -0.34, sector: "FMCG", marketCap: 567890 },
    { name: "State Bank of India", ticker: "SBIN", price: 723.90, change: 2.78, sector: "Banking", marketCap: 645789 },
    { name: "Bharti Airtel", ticker: "BHARTIARTL", price: 889.55, change: -0.67, sector: "Telecom", marketCap: 532109 },
    { name: "ICICI Bank", ticker: "ICICIBANK", price: 1198.30, change: 1.89, sector: "Banking", marketCap: 865432 },
    { name: "Larsen & Toubro", ticker: "LT", price: 3289.60, change: 0.45, sector: "Infrastructure", marketCap: 459067 },
    { name: "Asian Paints", ticker: "ASIANPAINT", price: 3156.80, change: -1.67, sector: "Paints", marketCap: 331245 },
    { name: "Wipro Limited", ticker: "WIPRO", price: 532.15, change: 1.23, sector: "IT", marketCap: 295678 },
    { name: "Maruti Suzuki", ticker: "MARUTI", price: 10876.45, change: -0.89, sector: "Auto", marketCap: 328765 },
    { name: "Hindustan Unilever", ticker: "HINDUNILVR", price: 2598.75, change: 0.56, sector: "FMCG", marketCap: 607123 },
    { name: "Bajaj Finance", ticker: "BAJFINANCE", price: 7289.30, change: 3.45, sector: "NBFC", marketCap: 452876 },
    { name: "HDFC Life", ticker: "HDFCLIFE", price: 667.90, change: 1.78, sector: "Insurance", marketCap: 143987 },
    { name: "Kotak Mahindra Bank", ticker: "KOTAKBANK", price: 1756.40, change: 0.95, sector: "Banking", marketCap: 348765 },
    { name: "HCL Technologies", ticker: "HCLTECH", price: 1234.60, change: 2.15, sector: "IT", marketCap: 334567 },
    { name: "Axis Bank", ticker: "AXISBANK", price: 1089.75, change: -0.45, sector: "Banking", marketCap: 332456 },
    { name: "Nestle India", ticker: "NESTLEIND", price: 2345.80, change: 1.67, sector: "FMCG", marketCap: 226789 },
    { name: "UltraTech Cement", ticker: "ULTRACEMCO", price: 8765.25, change: -1.23, sector: "Cement", marketCap: 245678 }
];

// Generate realistic price history data
function generatePriceHistory(currentPrice, days) {
    const history = [];
    let price = currentPrice * 0.85; // Start 15% lower
    const volatility = 0.02; // 2% daily volatility
    
    for (let i = 0; i < days; i++) {
        const change = (Math.random() - 0.5) * volatility * 2;
        price = price * (1 + change);
        
        const date = new Date();
        date.setDate(date.getDate() - (days - i));
        
        history.push({
            date: date.toISOString().split('T')[0],
            price: parseFloat(price.toFixed(2)),
            volume: Math.floor(Math.random() * 1000000) + 100000
        });
    }
    
    return history;
}

// Add price history to companies
companies.forEach(company => {
    company.priceHistory = {
        '1M': generatePriceHistory(company.price, 30),
        '3M': generatePriceHistory(company.price, 90),
        '6M': generatePriceHistory(company.price, 180),
        '1Y': generatePriceHistory(company.price, 365),
        '5Y': generatePriceHistory(company.price, 1825)
    };
});

// Stock screening data
const stockData = [
    {
        name: "Reliance Industries",
        ticker: "RELIANCE",
        marketCap: 1661234,
        pe: 14.2,
        roe: 12.4,
        price: 2856.75,
        dividend: 2.8,
        growth: 15.6,
        sector: "Energy",
        volume: 2345678,
        eps: 201.5,
        bookValue: 1456.8,
        salesGrowth: 18.5,
        profitGrowth: 22.3
    },
    {
        name: "Tata Consultancy Services",
        ticker: "TCS",
        marketCap: 1234567,
        pe: 26.8,
        roe: 45.2,
        price: 3834.50,
        dividend: 1.9,
        growth: 18.3,
        sector: "IT",
        volume: 1876543,
        eps: 143.2,
        bookValue: 316.7,
        salesGrowth: 16.8,
        profitGrowth: 19.5
    },
    {
        name: "HDFC Bank",
        ticker: "HDFCBANK",
        marketCap: 987654,
        pe: 18.5,
        roe: 16.8,
        price: 1667.25,
        dividend: 1.2,
        growth: 12.7,
        sector: "Banking",
        volume: 3456789,
        eps: 90.1,
        bookValue: 534.2,
        salesGrowth: 14.2,
        profitGrowth: 16.8
    },
    {
        name: "Infosys",
        ticker: "INFY",
        marketCap: 654321,
        pe: 22.3,
        roe: 28.9,
        price: 1489.40,
        dividend: 2.5,
        growth: 16.4,
        sector: "IT",
        volume: 2987654,
        eps: 66.8,
        bookValue: 231.5,
        salesGrowth: 15.7,
        profitGrowth: 18.9
    },
    {
        name: "ITC",
        ticker: "ITC",
        marketCap: 567890,
        pe: 24.7,
        roe: 22.1,
        price: 456.75,
        dividend: 4.8,
        growth: 8.2,
        sector: "FMCG",
        volume: 4567890,
        eps: 18.5,
        bookValue: 84.3,
        salesGrowth: 9.8,
        profitGrowth: 11.2
    },
    {
        name: "State Bank of India",
        ticker: "SBIN",
        marketCap: 456789,
        pe: 12.1,
        roe: 14.5,
        price: 723.90,
        dividend: 3.2,
        growth: 10.8,
        sector: "Banking",
        volume: 5678901,
        eps: 59.8,
        bookValue: 412.7,
        salesGrowth: 12.5,
        profitGrowth: 15.3
    },
    {
        name: "Bharti Airtel",
        ticker: "BHARTIARTL",
        marketCap: 432109,
        pe: 19.8,
        roe: 18.7,
        price: 889.55,
        dividend: 1.8,
        growth: 14.2,
        sector: "Telecom",
        volume: 1234567,
        eps: 44.9,
        bookValue: 240.3,
        salesGrowth: 13.8,
        profitGrowth: 17.2
    },
    {
        name: "ICICI Bank",
        ticker: "ICICIBANK",
        marketCap: 765432,
        pe: 16.4,
        roe: 15.9,
        price: 1198.30,
        dividend: 2.1,
        growth: 13.5,
        sector: "Banking",
        volume: 2345678,
        eps: 73.1,
        bookValue: 459.8,
        salesGrowth: 11.9,
        profitGrowth: 14.7
    },
    {
        name: "Larsen & Toubro",
        ticker: "LT",
        marketCap: 389067,
        pe: 20.5,
        roe: 13.2,
        price: 3289.60,
        dividend: 2.9,
        growth: 11.8,
        sector: "Infrastructure",
        volume: 987654,
        eps: 160.5,
        bookValue: 1215.7,
        salesGrowth: 10.4,
        profitGrowth: 13.6
    },
    {
        name: "Asian Paints",
        ticker: "ASIANPAINT",
        marketCap: 331245,
        pe: 45.6,
        roe: 28.3,
        price: 3156.80,
        dividend: 1.5,
        growth: 19.7,
        sector: "Paints",
        volume: 876543,
        eps: 69.2,
        bookValue: 244.6,
        salesGrowth: 17.8,
        profitGrowth: 21.4
    },
    {
        name: "Wipro",
        ticker: "WIPRO",
        marketCap: 245678,
        pe: 18.9,
        roe: 17.6,
        price: 532.15,
        dividend: 3.1,
        growth: 9.4,
        sector: "IT",
        volume: 1567890,
        eps: 28.2,
        bookValue: 160.1,
        salesGrowth: 8.7,
        profitGrowth: 11.3
    },
    {
        name: "Maruti Suzuki",
        ticker: "MARUTI",
        marketCap: 298765,
        pe: 28.4,
        roe: 19.2,
        price: 10876.45,
        dividend: 1.7,
        growth: 6.8,
        sector: "Auto",
        volume: 765432,
        eps: 383.0,
        bookValue: 1995.8,
        salesGrowth: 5.9,
        profitGrowth: 8.4
    },
    {
        name: "Hindustan Unilever",
        ticker: "HINDUNILVR",
        marketCap: 567123,
        pe: 52.3,
        roe: 85.7,
        price: 2598.75,
        dividend: 2.4,
        growth: 7.9,
        sector: "FMCG",
        volume: 1098765,
        eps: 49.7,
        bookValue: 58.0,
        salesGrowth: 6.8,
        profitGrowth: 9.2
    },
    {
        name: "Bajaj Finance",
        ticker: "BAJFINANCE",
        marketCap: 432876,
        pe: 31.2,
        roe: 21.4,
        price: 7289.30,
        dividend: 1.1,
        growth: 22.6,
        sector: "NBFC",
        volume: 654321,
        eps: 233.6,
        bookValue: 1092.4,
        salesGrowth: 20.8,
        profitGrowth: 25.3
    },
    {
        name: "HDFC Life",
        ticker: "HDFCLIFE",
        marketCap: 123987,
        pe: 24.8,
        roe: 16.3,
        price: 667.90,
        dividend: 2.8,
        growth: 15.3,
        sector: "Insurance",
        volume: 432109,
        eps: 26.9,
        bookValue: 165.2,
        salesGrowth: 14.1,
        profitGrowth: 17.8
    }
];

// Portfolio data
const portfolioData = {
    holdings: [
        { ticker: "RELIANCE", name: "Reliance Industries", qty: 50, avgPrice: 2456.75, currentPrice: 2856.75, weight: 18.5 },
        { ticker: "TCS", name: "Tata Consultancy Services", qty: 25, avgPrice: 3234.50, currentPrice: 3834.50, weight: 15.2 },
        { ticker: "HDFCBANK", name: "HDFC Bank", qty: 75, avgPrice: 1567.25, currentPrice: 1667.25, weight: 16.8 },
        { ticker: "INFY", name: "Infosys", qty: 100, avgPrice: 1289.40, currentPrice: 1489.40, weight: 19.3 },
        { ticker: "ITC", name: "ITC Limited", qty: 200, avgPrice: 456.75, currentPrice: 456.75, weight: 11.8 },
        { ticker: "SBIN", name: "State Bank of India", qty: 150, avgPrice: 623.90, currentPrice: 723.90, weight: 14.1 },
        { ticker: "ICICIBANK", name: "ICICI Bank", qty: 80, avgPrice: 1098.30, currentPrice: 1198.30, weight: 12.4 }
    ],
    performance: generatePriceHistory(1245678, 365) // Portfolio value history
};

// Financial data for company pages
const financialData = {
    "RELIANCE": {
        profitLoss: [
            { item: "Revenue", 2024: 792756, 2023: 721345, 2022: 665432, 2021: 598234, 2020: 534567 },
            { item: "Operating Expenses", 2024: 642345, 2023: 587234, 2022: 534567, 2021: 489123, 2020: 445678 },
            { item: "EBITDA", 2024: 150411, 2023: 134111, 2022: 130865, 2021: 109111, 2020: 88889 },
            { item: "Interest", 2024: 28456, 2023: 26789, 2022: 24567, 2021: 22345, 2020: 20123 },
            { item: "Depreciation", 2024: 48234, 2023: 45123, 2022: 42567, 2021: 39234, 2020: 36789 },
            { item: "Net Profit", 2024: 73670, 2023: 62199, 2022: 63731, 2021: 47532, 2020: 31839 }
        ],
        balanceSheet: [
            { item: "Share Capital", 2024: 6766, 2023: 6766, 2022: 6766, 2021: 6766, 2020: 6766 },
            { item: "Reserves", 2024: 567890, 2023: 523456, 2022: 487234, 2021: 445678, 2020: 398765 },
            { item: "Total Assets", 2024: 1945678, 2023: 1789234, 2022: 1654321, 2021: 1534567, 2020: 1423456 },
            { item: "Fixed Assets", 2024: 1234567, 2023: 1156789, 2022: 1087654, 2021: 1023456, 2020: 965432 },
            { item: "Current Assets", 2024: 456789, 2023: 398765, 2022: 345678, 2021: 298765, 2020: 254321 },
            { item: "Current Liabilities", 2024: 289765, 2023: 256789, 2022: 234567, 2021: 212345, 2020: 189234 }
        ],
        cashFlow: [
            { item: "Operating Cash Flow", 2024: 98765, 2023: 87654, 2022: 76543, 2021: 65432, 2020: 54321 },
            { item: "Investing Cash Flow", 2024: -45678, 2023: -39876, 2022: -34567, 2021: -29876, 2020: -25432 },
            { item: "Financing Cash Flow", 2024: -23456, 2023: -19876, 2022: -16543, 2021: -13876, 2020: -11234 },
            { item: "Net Cash Flow", 2024: 29631, 2023: 27902, 2022: 25433, 2021: 21680, 2020: 17655 },
            { item: "Free Cash Flow", 2024: 67890, 2023: 59876, 2022: 52345, 2021: 45678, 2020: 38901 }
        ],
        keyMetrics: {
            marketCap: "₹16,61,234 Cr",
            pe: "14.2",
            roe: "12.4%",
            debtEquity: "0.34",
            revenue: "₹7,92,756 Cr",
            netProfit: "₹73,670 Cr"
        }
    },
    "TCS": {
        profitLoss: [
            { item: "Revenue", 2024: 264567, 2023: 238765, 2022: 218432, 2021: 196543, 2020: 176789 },
            { item: "Operating Expenses", 2024: 176789, 2023: 165678, 2022: 152456, 2021: 138765, 2020: 125432 },
            { item: "EBITDA", 2024: 87778, 2023: 73087, 2022: 65976, 2021: 57778, 2020: 51357 },
            { item: "Interest", 2024: 2345, 2023: 2123, 2022: 1987, 2021: 1765, 2020: 1543 },
            { item: "Depreciation", 2024: 12345, 2023: 11234, 2022: 10123, 2021: 9012, 2020: 8901 },
            { item: "Net Profit", 2024: 73088, 2023: 59730, 2022: 53866, 2021: 47001, 2020: 40913 }
        ],
        balanceSheet: [
            { item: "Share Capital", 2024: 3712, 2023: 3712, 2022: 3712, 2021: 3712, 2020: 3712 },
            { item: "Reserves", 2024: 264567, 2023: 218765, 2022: 196543, 2021: 174321, 2020: 152109 },
            { item: "Total Assets", 2024: 506789, 2023: 438765, 2022: 385678, 2021: 338765, 2020: 294321 },
            { item: "Fixed Assets", 2024: 143456, 2023: 129876, 2022: 118765, 2021: 107654, 2020: 96543 },
            { item: "Current Assets", 2024: 264567, 2023: 218765, 2022: 196543, 2021: 174321, 2020: 152109 },
            { item: "Current Liabilities", 2024: 118766, 2023: 107655, 2022: 96544, 2021: 85433, 2020: 74322 }
        ],
        cashFlow: [
            { item: "Operating Cash Flow", 2024: 77890, 2023: 69876, 2022: 62345, 2021: 55678, 2020: 48901 },
            { item: "Investing Cash Flow", 2024: -33456, 2023: -29876, 2022: -26543, 2021: -23876, 2020: -21234 },
            { item: "Financing Cash Flow", 2024: -44567, 2023: -39876, 2022: -35432, 2021: -31098, 2020: -27654 },
            { item: "Net Cash Flow", 2024: -133, 2023: 124, 2022: 370, 2021: 704, 2020: 13 },
            { item: "Free Cash Flow", 2024: 65545, 2023: 58642, 2022: 51222, 2021: 45802, 2020: 40667 }
        ],
        keyMetrics: {
            marketCap: "₹13,98,765 Cr",
            pe: "26.8",
            roe: "45.2%",
            debtEquity: "0.08",
            revenue: "₹2,64,567 Cr",
            netProfit: "₹73,088 Cr"
        }
    },
    "TCS": {
        profitLoss: [
            { item: "Revenue", 2024: 234567, 2023: 218765, 2022: 198432, 2021: 176543, 2020: 156789 },
            { item: "Operating Expenses", 2024: 156789, 2023: 145678, 2022: 132456, 2021: 118765, 2020: 105432 },
            { item: "EBITDA", 2024: 77778, 2023: 73087, 2022: 65976, 2021: 57778, 2020: 51357 },
            { item: "Interest", 2024: 2345, 2023: 2123, 2022: 1987, 2021: 1765, 2020: 1543 },
            { item: "Depreciation", 2024: 12345, 2023: 11234, 2022: 10123, 2021: 9012, 2020: 8901 },
            { item: "Net Profit", 2024: 63088, 2023: 59730, 2022: 53866, 2021: 47001, 2020: 40913 }
        ],
        balanceSheet: [
            { item: "Share Capital", 2024: 3712, 2023: 3712, 2022: 3712, 2021: 3712, 2020: 3712 },
            { item: "Reserves", 2024: 234567, 2023: 198765, 2022: 176543, 2021: 154321, 2020: 132109 },
            { item: "Total Assets", 2024: 456789, 2023: 398765, 2022: 345678, 2021: 298765, 2020: 254321 },
            { item: "Fixed Assets", 2024: 123456, 2023: 109876, 2022: 98765, 2021: 87654, 2020: 76543 },
            { item: "Current Assets", 2024: 234567, 2023: 198765, 2022: 176543, 2021: 154321, 2020: 132109 },
            { item: "Current Liabilities", 2024: 98766, 2023: 87655, 2022: 76544, 2021: 65433, 2020: 54322 }
        ],
        cashFlow: [
            { item: "Operating Cash Flow", 2024: 67890, 2023: 59876, 2022: 52345, 2021: 45678, 2020: 38901 },
            { item: "Investing Cash Flow", 2024: -23456, 2023: -19876, 2022: -16543, 2021: -13876, 2020: -11234 },
            { item: "Financing Cash Flow", 2024: -34567, 2023: -29876, 2022: -25432, 2021: -21098, 2020: -17654 },
            { item: "Net Cash Flow", 2024: 9867, 2023: 10124, 2022: 10370, 2021: 10704, 2020: 10013 },
            { item: "Free Cash Flow", 2024: 55545, 2023: 48642, 2022: 41222, 2021: 35802, 2020: 30667 }
        ],
        keyMetrics: {
            marketCap: "₹12,34,567 Cr",
            pe: "26.8",
            roe: "45.2%",
            debtEquity: "0.08",
            revenue: "₹2,34,567 Cr",
            netProfit: "₹63,088 Cr"
        }
    },
    "HDFCBANK": {
        profitLoss: [
            { item: "Interest Income", 2024: 189765, 2023: 167543, 2022: 145321, 2021: 123098, 2020: 109876 },
            { item: "Interest Expense", 2024: 87654, 2023: 76543, 2022: 65432, 2021: 54321, 2020: 48765 },
            { item: "Net Interest Income", 2024: 102111, 2023: 91000, 2022: 79889, 2021: 68777, 2020: 61111 },
            { item: "Other Income", 2024: 45678, 2023: 39876, 2022: 34567, 2021: 29876, 2020: 25432 },
            { item: "Operating Expenses", 2024: 67890, 2023: 59876, 2022: 52345, 2021: 45678, 2020: 38901 },
            { item: "Net Profit", 2024: 79899, 2023: 71000, 2022: 62111, 2021: 52975, 2020: 47642 }
        ],
        balanceSheet: [
            { item: "Share Capital", 2024: 5432, 2023: 5432, 2022: 5432, 2021: 5432, 2020: 5432 },
            { item: "Reserves", 2024: 345678, 2023: 298765, 2022: 254321, 2021: 212098, 2020: 176543 },
            { item: "Deposits", 2024: 1876543, 2023: 1654321, 2022: 1432109, 2021: 1234567, 2020: 1098765 },
            { item: "Advances", 2024: 1345678, 2023: 1198765, 2022: 1054321, 2021: 923456, 2020: 812345 },
            { item: "Investments", 2024: 567890, 2023: 498765, 2022: 432109, 2021: 376543, 2020: 323456 },
            { item: "Total Assets", 2024: 2234567, 2023: 1987654, 2022: 1743210, 2021: 1523456, 2020: 1334567 }
        ],
        cashFlow: [
            { item: "Operating Cash Flow", 2024: 89765, 2023: 78654, 2022: 67543, 2021: 56432, 2020: 48765 },
            { item: "Investing Cash Flow", 2024: -34567, 2023: -29876, 2022: -25432, 2021: -21098, 2020: -17654 },
            { item: "Financing Cash Flow", 2024: -45678, 2023: -39876, 2022: -34567, 2021: -29876, 2020: -25432 },
            { item: "Net Cash Flow", 2024: 9520, 2023: 8902, 2022: 7544, 2021: 5458, 2020: 5679 },
            { item: "Free Cash Flow", 2024: 67890, 2023: 59876, 2022: 52345, 2021: 45678, 2020: 38901 }
        ],
        keyMetrics: {
            marketCap: "₹9,87,654 Cr",
            pe: "18.5",
            roe: "16.8%",
            debtEquity: "0.12",
            revenue: "₹1,89,765 Cr",
            netProfit: "₹79,899 Cr"
        }
    }
};

// Add financial data for other companies with similar structure
["INFY", "ITC", "SBIN", "BHARTIARTL", "ICICIBANK", "LT", "ASIANPAINT", "WIPRO", "MARUTI", "HINDUNILVR", "BAJFINANCE", "HDFCLIFE"].forEach(ticker => {
    if (!financialData[ticker]) {
        const company = companies.find(c => c.ticker === ticker);
        const stockInfo = stockData.find(s => s.ticker === ticker);
        
        if (company && stockInfo) {
            financialData[ticker] = {
                profitLoss: [
                    { item: "Revenue", 2024: Math.floor(Math.random() * 500000) + 100000, 2023: Math.floor(Math.random() * 450000) + 90000, 2022: Math.floor(Math.random() * 400000) + 80000, 2021: Math.floor(Math.random() * 350000) + 70000, 2020: Math.floor(Math.random() * 300000) + 60000 },
                    { item: "Operating Expenses", 2024: Math.floor(Math.random() * 400000) + 80000, 2023: Math.floor(Math.random() * 360000) + 72000, 2022: Math.floor(Math.random() * 320000) + 64000, 2021: Math.floor(Math.random() * 280000) + 56000, 2020: Math.floor(Math.random() * 240000) + 48000 },
                    { item: "EBITDA", 2024: Math.floor(Math.random() * 100000) + 20000, 2023: Math.floor(Math.random() * 90000) + 18000, 2022: Math.floor(Math.random() * 80000) + 16000, 2021: Math.floor(Math.random() * 70000) + 14000, 2020: Math.floor(Math.random() * 60000) + 12000 },
                    { item: "Interest", 2024: Math.floor(Math.random() * 20000) + 5000, 2023: Math.floor(Math.random() * 18000) + 4500, 2022: Math.floor(Math.random() * 16000) + 4000, 2021: Math.floor(Math.random() * 14000) + 3500, 2020: Math.floor(Math.random() * 12000) + 3000 },
                    { item: "Depreciation", 2024: Math.floor(Math.random() * 30000) + 10000, 2023: Math.floor(Math.random() * 27000) + 9000, 2022: Math.floor(Math.random() * 24000) + 8000, 2021: Math.floor(Math.random() * 21000) + 7000, 2020: Math.floor(Math.random() * 18000) + 6000 },
                    { item: "Net Profit", 2024: Math.floor(Math.random() * 80000) + 15000, 2023: Math.floor(Math.random() * 72000) + 13500, 2022: Math.floor(Math.random() * 64000) + 12000, 2021: Math.floor(Math.random() * 56000) + 10500, 2020: Math.floor(Math.random() * 48000) + 9000 }
                ],
                balanceSheet: [
                    { item: "Share Capital", 2024: Math.floor(Math.random() * 10000) + 3000, 2023: Math.floor(Math.random() * 10000) + 3000, 2022: Math.floor(Math.random() * 10000) + 3000, 2021: Math.floor(Math.random() * 10000) + 3000, 2020: Math.floor(Math.random() * 10000) + 3000 },
                    { item: "Reserves", 2024: Math.floor(Math.random() * 400000) + 100000, 2023: Math.floor(Math.random() * 360000) + 90000, 2022: Math.floor(Math.random() * 320000) + 80000, 2021: Math.floor(Math.random() * 280000) + 70000, 2020: Math.floor(Math.random() * 240000) + 60000 },
                    { item: "Total Assets", 2024: Math.floor(Math.random() * 1500000) + 500000, 2023: Math.floor(Math.random() * 1350000) + 450000, 2022: Math.floor(Math.random() * 1200000) + 400000, 2021: Math.floor(Math.random() * 1050000) + 350000, 2020: Math.floor(Math.random() * 900000) + 300000 },
                    { item: "Fixed Assets", 2024: Math.floor(Math.random() * 800000) + 200000, 2023: Math.floor(Math.random() * 720000) + 180000, 2022: Math.floor(Math.random() * 640000) + 160000, 2021: Math.floor(Math.random() * 560000) + 140000, 2020: Math.floor(Math.random() * 480000) + 120000 },
                    { item: "Current Assets", 2024: Math.floor(Math.random() * 300000) + 100000, 2023: Math.floor(Math.random() * 270000) + 90000, 2022: Math.floor(Math.random() * 240000) + 80000, 2021: Math.floor(Math.random() * 210000) + 70000, 2020: Math.floor(Math.random() * 180000) + 60000 },
                    { item: "Current Liabilities", 2024: Math.floor(Math.random() * 200000) + 50000, 2023: Math.floor(Math.random() * 180000) + 45000, 2022: Math.floor(Math.random() * 160000) + 40000, 2021: Math.floor(Math.random() * 140000) + 35000, 2020: Math.floor(Math.random() * 120000) + 30000 }
                ],
                cashFlow: [
                    { item: "Operating Cash Flow", 2024: Math.floor(Math.random() * 80000) + 20000, 2023: Math.floor(Math.random() * 72000) + 18000, 2022: Math.floor(Math.random() * 64000) + 16000, 2021: Math.floor(Math.random() * 56000) + 14000, 2020: Math.floor(Math.random() * 48000) + 12000 },
                    { item: "Investing Cash Flow", 2024: -(Math.floor(Math.random() * 30000) + 10000), 2023: -(Math.floor(Math.random() * 27000) + 9000), 2022: -(Math.floor(Math.random() * 24000) + 8000), 2021: -(Math.floor(Math.random() * 21000) + 7000), 2020: -(Math.floor(Math.random() * 18000) + 6000) },
                    { item: "Financing Cash Flow", 2024: -(Math.floor(Math.random() * 25000) + 8000), 2023: -(Math.floor(Math.random() * 22500) + 7200), 2022: -(Math.floor(Math.random() * 20000) + 6400), 2021: -(Math.floor(Math.random() * 17500) + 5600), 2020: -(Math.floor(Math.random() * 15000) + 4800) },
                    { item: "Net Cash Flow", 2024: Math.floor(Math.random() * 20000) + 5000, 2023: Math.floor(Math.random() * 18000) + 4500, 2022: Math.floor(Math.random() * 16000) + 4000, 2021: Math.floor(Math.random() * 14000) + 3500, 2020: Math.floor(Math.random() * 12000) + 3000 },
                    { item: "Free Cash Flow", 2024: Math.floor(Math.random() * 60000) + 15000, 2023: Math.floor(Math.random() * 54000) + 13500, 2022: Math.floor(Math.random() * 48000) + 12000, 2021: Math.floor(Math.random() * 42000) + 10500, 2020: Math.floor(Math.random() * 36000) + 9000 }
                ],
                keyMetrics: {
                    marketCap: `₹${(stockInfo.marketCap / 100).toFixed(0)} Cr`,
                    pe: stockInfo.pe.toString(),
                    roe: `${stockInfo.roe}%`,
                    debtEquity: (Math.random() * 0.5 + 0.1).toFixed(2),
                    revenue: `₹${Math.floor(Math.random() * 500000) + 100000} Cr`,
                    netProfit: `₹${Math.floor(Math.random() * 80000) + 15000} Cr`
                }
            };
        }
    }
});

// Chatbot responses
const chatbotResponses = {
    "pe ratio": "PE Ratio (Price-to-Earnings) is a valuation metric that compares a company's current share price to its earnings per share. It shows how much investors are willing to pay for each rupee of earnings. A lower PE might indicate an undervalued stock, while a higher PE might suggest growth expectations.",
    "roe": "ROE (Return on Equity) measures how efficiently a company uses shareholders' equity to generate profits. It's calculated as Net Income ÷ Shareholders' Equity × 100. A higher ROE generally indicates better management efficiency and profitability.",
    "market cap": "Market Capitalization is the total value of a company's shares in the stock market. It's calculated by multiplying the current stock price by the total number of outstanding shares. Companies are typically classified as small-cap, mid-cap, or large-cap based on their market cap.",
    "debt equity": "Debt-to-Equity ratio measures a company's financial leverage by comparing total debt to shareholders' equity. A lower ratio generally indicates less financial risk, while a higher ratio might suggest the company is using more debt to finance its operations.",
    "dividend": "Dividend is a payment made by companies to their shareholders, usually as a distribution of profits. Dividend yield shows the annual dividend as a percentage of the stock price, indicating the income return on investment.",
    "ebitda": "EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is a measure of a company's operating performance. It shows how profitable a company is before accounting for financial and accounting decisions.",
    "cash flow": "Cash Flow represents the net amount of cash moving into and out of a business. Operating cash flow shows cash from core business operations, while free cash flow indicates cash available after capital expenditures.",
    "balance sheet": "A Balance Sheet is a financial statement that shows a company's assets, liabilities, and shareholders' equity at a specific point in time. It follows the equation: Assets = Liabilities + Shareholders' Equity.",
    "profit loss": "Profit & Loss (P&L) statement shows a company's revenues, costs, and expenses during a specific period. It helps determine whether a company made or lost money during that period.",
    "revenue": "Revenue is the total amount of income generated by a company from its business operations before any costs or expenses are deducted. It's also called the 'top line' of the income statement.",
    "net profit": "Net Profit is the amount of money remaining after all operating expenses, interest, taxes, and preferred stock dividends have been subtracted from a company's total revenue. It's the 'bottom line' of the income statement."
};