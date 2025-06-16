import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';

const years = [2019, 2020, 2021, 2022, 2023]; // 5-year time series

export default function CityLineChart({ data }) {
  const [selectedMetric, setSelectedMetric] = useState('gdpHistory');

  // Convert historical data into a year-wise array for Recharts
  const getTransformedData = () => {
    return years.map((year, index) => {
      const entry = { year: String(year) };
      data.forEach(city => {
        const key = city.city;
        const values = city[selectedMetric];
        if (values && values.length === years.length) {
          entry[key] = values[index];
        }
      });
      return entry;
    });
  };

  const metricLabelMap = {
    gdpHistory: 'GDP',
    hdiHistory: 'HDI',
    co2History: 'CO₂'
  };

  const chartData = getTransformedData();

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>📈 5-Year Trend: {metricLabelMap[selectedMetric]}</h2>

      <label>
        <strong>Select Metric:</strong>{' '}
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
        >
          <option value="gdpHistory">GDP</option>
          <option value="hdiHistory">HDI</option>
          <option value="co2History">CO₂</option>
        </select>
      </label>

      <LineChart width={700} height={350} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.map((city, index) => (
          <Line
            key={city.city}
            type="monotone"
            dataKey={city.city}
            stroke={`hsl(${(index * 100) % 360}, 70%, 50%)`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </div>
  );
}
