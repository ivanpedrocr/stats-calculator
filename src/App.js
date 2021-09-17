import {
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  Box,
  FormControl,
} from "@material-ui/core";
import { useState } from "react";
import "./App.css";
import { renderChart, TypeToChart } from "./chartRender/chart-render";
import StatsCalculator from "./stats-funcs/stats-calculator";

function App() {
  const [input, setInput] = useState("");
  const [chartType, setChartType] = useState();
  const stats = StatsCalculator(input);
  console.log(Object.entries(stats));
  return (
    <div className="App">
      <Box>
        <FormControl>
          <Box flexDirection="row">
            <TextField
              type="text"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              placeholder="Data"
            />
            <TextField
              fullWidth
              label="Chart Type"
              select
              id="chart type"
              value={chartType}
              onChange={(e) => {
                setChartType(e.target.value);
              }}
            >
              <MenuItem value="line">Line Chart</MenuItem>
              <MenuItem value="histogram">Histogram</MenuItem>
            </TextField>
          </Box>
        </FormControl>
      </Box>
      <ol>
        {input &&
          Object.entries(stats).map(([key, value]) => (
            <Typography>
              {key}: {value}
            </Typography>
          ))}
      </ol>
      {input && chartType && (
        <TypeToChart resultSet={stats.frequencyArr} chartType={chartType} />
      )}
    </div>
  );
}

export default App;
