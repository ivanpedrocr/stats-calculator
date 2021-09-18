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
import { chunkify } from "../stats-funcs/func";

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
    case "histogram":
      const results = chunkify(rawArr, 7).map((range) => {
        const rangeFrequency = range.length
        const min = +range[0]
        const max = Math.max(...range);
        return { frequency: rangeFrequency, min, key: `${min} - ${max}` };
      });
      return (
        <CartesianChart
          ChartComponent={BarChart}
          resultSet={results}
          barCategoryGap={0}
        >
          <Bar stackId="a" dataKey="frequency" fill={colors[0]} />;
        </CartesianChart>
      );
  }
};
