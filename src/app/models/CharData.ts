import { CandlestickData, HistogramData } from "lightweight-charts";

export interface ChartData {
    candlestick: CandlestickData[];
    volume: HistogramData[];
  }