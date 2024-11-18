import { ChartType } from "ng-apexcharts";

export interface ChartStatistics {
    mainTitle?: string;
    value?: number | string;
    subValue?: number;
    chartType?: ChartType;
    chartData?: number[];
    chartColors?: string[];
}