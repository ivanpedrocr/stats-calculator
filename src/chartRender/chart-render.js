import React from "react";

import {
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { chunkify, floor10 } from "../stats-funcs/func";

const colors = ["#FF6492", "#141446", "#7A77FF"];

const CartesianChart = ({
  resultSet,
  children,
  ChartComponent,
  barCategoryGap,
}) => (
  <ResponsiveContainer width="100%" height={350}>
    <ChartComponent data={resultSet} barCategoryGap={barCategoryGap}>
      <XAxis dataKey="key" />
      <YAxis />
      <CartesianGrid />
      {children}
      <Legend />
      <Tooltip />
    </ChartComponent>
  </ResponsiveContainer>
);

export const TypeToChart = ({ frequencyArr, rawArr, chartType }) => {
  switch (chartType) {
    case "line":
      return (
        <CartesianChart ChartComponent={LineChart} resultSet={frequencyArr}>
          <Line
            stackId="a"
            dataKey="frequency"
            stroke={colors[0]}
            activeDot={{ r: 8 }}
          />
        </CartesianChart>
      );
    case "histogram":     //TODO add bar chartm dot plot, pie chart option
      const min = Math.min(...rawArr)
      const max = Math.max(...rawArr)
      const bars = rawArr.length <= 9 ? rawArr.length : 7
      let n = 0
      const results = chunkify(rawArr, 6).map((range) => {
        n+=1
        const rangeFrequency = range.length
        return { frequency: rangeFrequency, key: `${n === 1 ? min : (floor10(((max - min)/bars), -2) * (n-1) + min).toFixed()}-${(floor10(((max - min)/bars), -2) * n + min).toFixed()}` };
      });
      return (
        <CartesianChart
          ChartComponent={BarChart}
          resultSet={rawArr.length <= 9 ? frequencyArr : results}
          barCategoryGap={0}
        >
          <Bar stackId="a" dataKey="frequency" fill={colors[0]} />;
        </CartesianChart>
      );
  }
};
