import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function CityScatterChart({ data }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>📈 Correlation: HDI vs GDP & CO₂ vs Life Expectancy</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 10, left: 0 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="hdi" name="HDI" />
          <YAxis type="number" dataKey="gdp" name="GDP" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="HDI vs GDP" data={data} fill="#8884d8" />

          <Scatter
            name="CO₂ vs Life Expectancy"
            data={data.map(city => ({
              ...city,
              hdi: city.co2, // using x-axis as CO2
              gdp: city.lifeExpectancy // using y-axis as Life Expectancy
            }))}
            fill="#82ca9d"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
