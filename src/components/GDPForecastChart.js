import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function GDPForecastChart({ data, growthRate }) {
  const chartData = [];

  // Assume last 5 years = 2019–2023
  const baseYears = [2019, 2020, 2021, 2022, 2023];

  data.forEach(city => {
    city.gdpHistory.forEach((gdp, i) => {
      const year = baseYears[i];
      let existing = chartData.find(c => c.year === year);
      if (!existing) {
        existing = { year };
        chartData.push(existing);
      }
      existing[city.city] = gdp;
    });

    // Add 5 future years
    let latestGDP = city.gdpHistory[city.gdpHistory.length - 1];
    for (let i = 1; i <= 5; i++) {
      const year = 2023 + i;
      latestGDP = latestGDP * (1 + growthRate / 100);
      let existing = chartData.find(c => c.year === year);
      if (!existing) {
        existing = { year };
        chartData.push(existing);
      }
      existing[city.city] = parseFloat(latestGDP.toFixed(2));
    }
  });

  return (
    <div>
      <h2>GDP Forecast (2024–2028)</h2>
      <LineChart width={700} height={300} data={chartData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.map(city => (
          <Line
            type="monotone"
            dataKey={city.city}
            key={city.city}
            stroke="#8884d8"
            dot={false}
          />
        ))}
      </LineChart>
    </div>
  );
}
