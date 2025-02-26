import { CandlestickData, HistogramData, ISeriesApi, Time } from "lightweight-charts"; 
import { ChartData } from "../models/CharData"; 
import { BASE_URL } from "../config/Ultil";   
import { BinanceKlineData } from "../response/BinaceRes";

// Hàm lấy dữ liệu từ Binance API
export const fetchChartData = async (
  interval: string, 
  setIsLoading: (loading: boolean) => void,
  setCurrentPrice: (price: string) => void,
  candlestickSeriesRef?: React.RefObject<ISeriesApi<"Candlestick"> | null>,
  volumeSeriesRef?: React.RefObject<ISeriesApi<"Histogram"> | null>
) => {
  try {
    setIsLoading(true);
    
    const response = await fetch(
      `${BASE_URL}/klines?symbol=BTCUSDT&interval=${interval}&limit=500`
    );
        
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
        
    const data = await response.json() as BinanceKlineData[];
    const formattedData = formatChartData(data);
        
    if (candlestickSeriesRef?.current && volumeSeriesRef?.current) {
      candlestickSeriesRef.current.setData(formattedData.candlestick);
      volumeSeriesRef.current.setData(formattedData.volume);
    }
        
    // Cập nhật giá hiện tại (dữ liệu mới nhất)
    if (formattedData.candlestick.length > 0) {
      const latestData = formattedData.candlestick[formattedData.candlestick.length - 1];
      setCurrentPrice(latestData.close.toString());
    }
        
    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    setIsLoading(false);
  }
};

// Hàm định dạng dữ liệu từ Binance API
export const formatChartData = (data: BinanceKlineData[]): ChartData => {
  const candlestickData: CandlestickData[] = [];
  const volumeData: HistogramData[] = [];

  data.forEach((item) => {
    // Convert to seconds and then to the Time type
    const time = (item[0] / 1000) as Time;
        
    // Dữ liệu nến
    candlestickData.push({
      time,
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4]),
    });
        
    // Dữ liệu khối lượng
    volumeData.push({
      time,
      value: parseFloat(item[5]),
      color: parseFloat(item[4]) >= parseFloat(item[1]) ? '#26a69a' : '#ef5350',
    });
  });

  return { candlestick: candlestickData, volume: volumeData };
};

// Hàm lấy giá Bitcoin hiện tại
export const fetchCurrentPrice = async (
  setCurrentPrice: (price: string) => void,
  setPrevPrice: (price: string) => void
) => {
  try {
    const response = await fetch(`${BASE_URL}/ticker/price?symbol=BTCUSDT`);
        
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
        
    const data = await response.json() as { price: string };
    setCurrentPrice(parseFloat(data.price).toFixed(2));
        
    // Lấy giá 1 phút trước đó
    const oneMinAgo = new Date();
    oneMinAgo.setMinutes(oneMinAgo.getMinutes() - 1);
        
    const minuteResponse = await fetch(
      `${BASE_URL}/klines?symbol=BTCUSDT&interval=1m&limit=2&endTime=${oneMinAgo.getTime()}`
    );
        
    if (minuteResponse.ok) {
      const minuteData = await minuteResponse.json() as BinanceKlineData[];
      if (minuteData.length > 0) {
        setPrevPrice(parseFloat(minuteData[0][4]).toFixed(2)); // Giá đóng cửa của nến 1 phút trước
      }
    }
  } catch (error) {
    console.error('Error fetching current price:', error);
  }
};