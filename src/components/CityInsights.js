export default function CityInsights({ data }) {
  if (!data || data.length === 0) return <p>No data available for insights.</p>;

  const highestHDI = [...data].sort((a, b) => b.hdi - a.hdi)[0];
  const lowestGDP = [...data].sort((a, b) => a.gdp - b.gdp)[0];
  const highestPopulation = [...data].sort((a, b) => b.population - a.population)[0];
  const lowestCO2 = [...data].sort((a, b) => a.co2 - b.co2)[0];

  return (
    <div style={{ margin: '2rem 0', background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
      <h2>🧠 AI-Driven Insights</h2>
      <ul>
        <li>🏆 <strong>{highestHDI.city}</strong> has the highest HDI of <strong>{highestHDI.hdi}</strong>.</li>
        <li>💸 <strong>{lowestGDP.city}</strong> has the lowest GDP at <strong>{lowestGDP.gdp}</strong>.</li>
        <li>👥 <strong>{highestPopulation.city}</strong> is the most populated with <strong>{highestPopulation.population.toLocaleString()}</strong> people.</li>
        <li>🌱 <strong>{lowestCO2.city}</strong> now has the lowest CO₂ emissions: <strong>{lowestCO2.co2} tons</strong>.</li>
      </ul>
    </div>
  );
}
