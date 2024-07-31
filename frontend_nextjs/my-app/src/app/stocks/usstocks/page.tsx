"use client"
import { useEffect, useRef, useState, memo } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';

const Home: NextPage = () => {
    const chartContainer = useRef<HTMLDivElement>(null);
    const quoteContainer = useRef<HTMLDivElement>(null);
    const [symbol, setSymbol] = useState('NASDAQ:TSLA');
    const [prices, setPrices] = useState<number | null>(null);
    const [units, setUnits] = useState<number | null>(null);

    const companies = [
        { name: 'Tesla', code: 'NASDAQ:TSLA' },
        { name: 'Apple', code: 'NASDAQ:AAPL' },
        { name: 'META', code: 'NASDAQ:META' },
        { name: 'Netflix', code: 'NASDAQ:NFLX' },
        { name: 'Amazon', code: 'NASDAQ:AMZN' },
    ];

    const reverseSymbolFormat = (symbol: string): string => {
        const parts = symbol.split(':');
        return `${parts[1]}:${parts[0]}`;
    };

    // Fetch stock price based on reversed symbol format
    const fetchPrice = async (symbol: string) => {
        const reversedSymbol = reverseSymbolFormat(symbol);
        try {
            const response = await axios.get('https://real-time-finance-data.p.rapidapi.com/stock-time-series', {
                params: { symbol: reversedSymbol, period: '1D', language: 'en' },
                headers: {
                    'x-rapidapi-key': process.env.NEXT_RAPIDAPI_USA,
                    'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
                }
            });

            // Assuming the price is directly in the response
            const data = response.data.data;
            setPrices(data.price); // Adjust according to actual data structure
        } catch (error) {
            console.error('Error fetching price:', error);
        }
    };

    useEffect(() => {
        fetchPrice(symbol);
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
            const parsedValue = parseFloat(value);
            if (!isNaN(parsedValue)) {
                setUnits(parsedValue);
            }
        }
    };

    const totalAmount = prices !== null ? prices * units : null;

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
                <input type="number" id="units" name="units" min="0" max="10000" step="any" value={units} onChange={handleUnitChange} />
            </div>
            <div>
                {prices !== null ? (
                    <p>Current Price: {prices}</p>
                ) : (
                    <p>Loading price...</p>
                )}
                {totalAmount !== null ? (
                    <p>Total Amount: {totalAmount}</p>
                ) : (
                    <p>Enter units to calculate total amount.</p>
                )}
            </div>
        </>
    );
};

export default memo(Home);
