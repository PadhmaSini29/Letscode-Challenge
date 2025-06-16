import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function CityBarChart({ data }) {
  return (
    <div>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="gdp" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
