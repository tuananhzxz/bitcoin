"use client"
import {
    CandlestickSeries,
    ColorType,
    createChart,
    CrosshairMode,
    HistogramSeries,
    IChartApi,
    ISeriesApi,
    TimeScaleOptions
} from 'lightweight-charts';
import React, {useEffect, useRef, useState} from 'react'
import {fetchChartData, fetchCurrentPrice} from '../service/ApiService';
import Head from 'next/head';
import {timeframes} from '../config/Ultil';

const BitcoinComponent = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [timeframe, setTimeframe] = useState<string>('1h');
    const [currentPrice, setCurrentPrice] = useState<string>('');
    const [prevPrice, setPrevPrice] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Lưu trữ tham chiếu đến biểu đồ và series
    const chartRef = useRef<IChartApi | null>(null);
    const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
    const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

    // Thiết lập biểu đồ ban đầu
    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Xóa biểu đồ cũ nếu đã tồn tại
        if (chartRef.current) {
          try {
            chartRef.current.remove();
            chartRef.current = null;
          } catch (error) {
            console.error("Error removing chart in cleanup:", error);
          }
        }

        const chartOptions = {
          layout: {
            background: { type: ColorType.Solid, color: isDarkMode ? '#151924' : '#ffffff' },
            textColor: isDarkMode ? '#d9d9d9' : '#333333',
          },
          width: chartContainerRef.current.clientWidth,
          height: 500,
          crosshair: {
            mode: CrosshairMode.Normal,
          },
          grid: {
            vertLines: {
              color: isDarkMode ? 'rgba(70, 70, 70, 0.5)' : 'rgba(220, 220, 220, 0.5)',
            },
            horzLines: {
              color: isDarkMode ? 'rgba(70, 70, 70, 0.5)' : 'rgba(220, 220, 220, 0.5)',
            },
          },
          timeScale: {
            rightOffset: 12,
            barSpacing: 10,
            fixLeftEdge: true,
            lockVisibleTimeRangeOnResize: true,
            rightBarStaysOnScroll: true,
            borderColor: isDarkMode ? '#333333' : '#D6DCDE',
            timeVisible: true,
            secondsVisible: timeframe.includes('m'),
          } as TimeScaleOptions,
        };

        try {
          // Tạo biểu đồ mới
          const chart = createChart(chartContainerRef.current, chartOptions);
          chartRef.current = chart;

          // Tạo series nến
            candlestickSeriesRef.current = chart.addSeries(CandlestickSeries, {
              upColor: '#26a69a',
              downColor: '#ef5350',
              borderVisible: false,
              wickUpColor: '#26a69a',
              wickDownColor: '#ef5350',
          });

          // Tạo series khối lượng (chiếm 25% tổng chiều cao)
            volumeSeriesRef.current = chart.addSeries(HistogramSeries, {
              color: '#26a69a',
              priceFormat: {
                  type: 'volume',
              },
              priceScaleId: 'volume',
          });

          // Adjust price scale for better visualization
          chart.priceScale('volume').applyOptions({
            scaleMargins: {
              top: 0.7,
              bottom: 0,
            },
          });

          // Lấy dữ liệu ban đầu
          fetchChartData(
            timeframe,
            setIsLoading,
            setCurrentPrice,
            candlestickSeriesRef,
            volumeSeriesRef
          );
        } catch (error) {
          console.error("Error creating chart:", error);
        }

        // Thêm sự kiện resize
        const handleResize = () => {
          if (chartContainerRef.current && chartRef.current) {
            chartRef.current.applyOptions({
              width: chartContainerRef.current.clientWidth
            });
          }
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          if (chartRef.current) {
            try {
              chartRef.current.remove();
              chartRef.current = null;
            } catch (error) {
              console.error("Error removing chart in cleanup:", error);
            }
          }
        };
    }, [isDarkMode, timeframe]);

    // Hàm xử lý khi click vào nút Fetch Current Price
    const handleFetchCurrentPrice = () => {
        fetchCurrentPrice(setCurrentPrice, setPrevPrice);
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <Head>
                <title>Bitcoin Chart | Next.js & TypeScript</title>
                <meta name="description" content="Bitcoin price chart with candlestick and volume analysis" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Bitcoin Price Chart</h1>

                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`px-4 py-2 rounded-md ${
                        isDarkMode 
                            ? 'bg-gray-200 text-gray-800' 
                            : 'bg-gray-800 text-white'
                        }`}
                    >
                        {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
                    </button>

                    {/* Timeframe Selection */}
                    <div className="flex flex-wrap gap-2">
                        {timeframes.map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-3 py-1 rounded-md ${
                            timeframe === tf
                                ? isDarkMode 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-blue-500 text-white'
                                : isDarkMode 
                                ? 'bg-gray-700 text-gray-300' 
                                : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            {tf}
                        </button>
                        ))}
                    </div>

                    {/* Price Fetch Button */}
                    <button
                        onClick={handleFetchCurrentPrice}
                        className={`px-4 py-2 rounded-md ${
                        isDarkMode 
                            ? 'bg-green-600 text-white' 
                            : 'bg-green-500 text-white'
                        }`}
                    >
                        Get Current Price And Price 1 Minute Ago
                    </button>
                </div>

                {/* Price Display */}
                {(currentPrice || prevPrice) && (
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentPrice && (
                    <div className={`p-4 rounded-md ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                        <h3 className="text-lg font-semibold mb-1">Current Price</h3>
                        <p className="text-2xl font-bold">${currentPrice}</p>
                    </div>
                    )}
                    {prevPrice && (
                    <div className={`p-4 rounded-md ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                        <h3 className="text-lg font-semibold mb-1">Price 1 Minute Ago</h3>
                        <p className="text-2xl font-bold">${prevPrice}</p>
                        {currentPrice && prevPrice && (
                        <p className={`text-sm mt-1 ${
                            parseFloat(currentPrice) > parseFloat(prevPrice)
                            ? 'text-green-500'
                            : parseFloat(currentPrice) < parseFloat(prevPrice)
                                ? 'text-red-500'
                                : ''
                        }`}>
                            {parseFloat(currentPrice) > parseFloat(prevPrice)
                            ? `▲ +${(parseFloat(currentPrice) - parseFloat(prevPrice)).toFixed(2)} (+${((parseFloat(currentPrice) - parseFloat(prevPrice)) / parseFloat(prevPrice) * 100).toFixed(2)}%)`
                            : parseFloat(currentPrice) < parseFloat(prevPrice)
                                ? `▼ ${(parseFloat(currentPrice) - parseFloat(prevPrice)).toFixed(2)} (${((parseFloat(currentPrice) - parseFloat(prevPrice)) / parseFloat(prevPrice) * 100).toFixed(2)}%)`
                                : 'No change'
                            }
                        </p>
                        )}
                    </div>
                    )}
                </div>
                )}

                {/* Loading Indicator */}
                {isLoading && (
                <div className="flex justify-center items-center mb-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="ml-2">Loading data...</span>
                </div>
                )}

                {/* Chart Container */}
                <div
                ref={chartContainerRef}
                className={`w-full h-[500px] rounded-lg overflow-hidden ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
                />

                <p className="text-sm text-center mt-4 text-gray-500">
                  2025 Created Tuan Anh Do
                </p>
            </main>
        </div>
    )
}

export default BitcoinComponent