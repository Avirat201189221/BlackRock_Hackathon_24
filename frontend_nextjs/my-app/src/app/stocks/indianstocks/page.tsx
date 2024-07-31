"use client"
import { useEffect, useRef, useState, memo } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';

const Home: NextPage = () => {
    const chartContainer = useRef<HTMLDivElement>(null);
    const quoteContainer = useRef<HTMLDivElement>(null);
    const [symbol, setSymbol] = useState('BSE:IOC');
    const [prices, setPrices] = useState<number | null>(null);
    const [units, setUnits] = useState<number | null>(null);

    // Add an `index` property to each company
    const companies = [
        { name: 'Indian Oil', code: 'BSE:IOC', index: 0 },
        { name: 'TCS', code: 'BSE:TCS', index: 1 },
        { name: 'Oil & Natural Gas', code: 'BSE:ONGC', index: 4 },
        { name: 'GAIL', code: 'BSE:GAIL', index: 7 },
        { name: 'Bharat Petroleum', code: 'BSE:BPCL', index: 3 },
    ];

    const fetchPrice = async (index: number) => {
        try {
            const response = await axios.get('https://indian-stock-exchange-api2.p.rapidapi.com/BSE_most_active', {
                headers: {
                    'x-rapidapi-key': process.env.NEXT_RAPIDAPI_INDIAN,
                    'x-rapidapi-host': 'indian-stock-exchange-api2.p.rapidapi.com'
                }
            });

            // Log the entire JSON response
            console.log('API Response:', response.data);

            // Get the stock from the specified index
            const stock = response.data[index];
            if (stock) {
                setPrices(stock.price);
            } else {
                console.error('Stock not found at index:', index);
            }
        } catch (error) {
            console.error('Error fetching price:', error);
        }
    };

    useEffect(() => {
        // Find the company index from the selected symbol
        const selectedCompany = companies.find(company => company.code === symbol);
        if (selectedCompany) {
            fetchPrice(selectedCompany.index);
        }

        // Remove existing widgets
        const removeExistingWidgets = () => {
            const chartScript = document.getElementById('tradingview-chart-script');
            if (chartScript) {
                chartScript.parentNode?.removeChild(chartScript);
            }

            const quoteScript = document.getElementById('tradingview-quote-script');
            if (quoteScript) {
                quoteScript.parentNode?.removeChild(quoteScript);
            }
        };

        removeExistingWidgets();

        // Load TradingView Advanced Chart widget
        const chartScript = document.createElement('script');
        chartScript.id = 'tradingview-chart-script';
        chartScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        chartScript.type = 'text/javascript';
        chartScript.async = true;
        chartScript.innerHTML = JSON.stringify({
            autosize: true,
            symbol: symbol,
            interval: 'D',
            timezone: 'Etc/UTC',
            theme: 'dark',
            style: '1',
            locale: 'en',
            allow_symbol_change: true,
            calendar: false,
            support_host: 'https://www.tradingview.com',
        });

        chartContainer.current?.appendChild(chartScript);

        // Load TradingView Single Quote widget
        const quoteScript = document.createElement('script');
        quoteScript.id = 'tradingview-quote-script';
        quoteScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
        quoteScript.async = true;
        quoteScript.innerHTML = JSON.stringify({
            symbol: symbol,
            width: 350,
            isTransparent: false,
            colorTheme: 'dark',
            locale: 'en',
        });

        quoteContainer.current?.appendChild(quoteScript);

        return () => {
            // Cleanup
            removeExistingWidgets();
        };
    }, [symbol]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSymbol(e.target.value);
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            setUnits(null); // Clear the units if input is empty
        } else {
            const parsedValue = parseInt(value, 10); // Parse as integer
            if (!isNaN(parsedValue) && parsedValue >= 0) {
                setUnits(parsedValue);
            } else {
                console.warn('Entered value is not a valid integer.');
            }
        }
    };

    const totalAmount = prices !== null && units !== null ? prices * units : null;

    return (
        <>
            <div>
                <select onChange={handleChange} value={symbol}>
                    {companies.map((company) => (
                        <option key={company.code} value={company.code}>
                            {company.name}
                        </option>
                    ))}
                </select>
            </div>
            <div style={{ height: '500px', width: '100%' }}>
                <div className="tradingview-widget-container" ref={chartContainer} style={{ height: '100%', width: '100%' }}>
                    <div className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
                    <div className="tradingview-widget-copyright">
                        <a href="https://www.tradingview.com/" rel="noopener noreferrer nofollow" target="_blank">
                            <span className="blue-text">Track all markets on TradingView</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="tradingview-widget-container" ref={quoteContainer} style={{ width: '100%', textAlign: 'center' }}>
                <div className="tradingview-widget-container__widget" style={{ margin: 'auto' }}></div>
                <div className="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                        <span className="blue-text">Track all markets on TradingView</span>
                    </a>
                </div>
            </div>
            <div>
                <label htmlFor="units">Enter Units:</label>
                <input
                    type="number"
                    id="units"
                    name="units"
                    min="0"
                    max="10000"
                    step="1" // Ensure step is set to 1 for integer values
                    value={units ?? ''}
                    onChange={handleUnitChange}
                />
            </div>
            <div>
                {prices !== null ? (
                    <p>Current Price: {prices}</p>
                ) : (
                    <p>Loading price...</p>
                )}
                {totalAmount !== null ? (
                    <p>Total Amount: {totalAmount.toFixed(2)}</p>
                ) : (
                    <p>Enter units to calculate total amount.</p>
                )}
            </div>
        </>
    );
};

export default memo(Home);
