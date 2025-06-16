import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function CityStatsCharts({ data }) {
  return (
    <div>
      <h2>Population</h2>
      <BarChart width={500} height={250} data={data}>
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="population" fill="#82ca9d" />
      </BarChart>

      <h2>CO₂ Emissions</h2>
      <BarChart width={500} height={250} data={data}>
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="co2" fill="#ff7f7f" />
      </BarChart>

      <h2>HDI</h2>
      <BarChart width={500} height={250} data={data}>
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="hdi" fill="#ffc658" />
      </BarChart>
    </div>
  );
}
