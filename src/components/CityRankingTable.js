export default function CityRankingTable({ data }) {
  const sorted = [...data].sort((a, b) => b.gdp - a.gdp);

  return (
    <div>
      <h2>Top Cities by GDP</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>City</th>
            <th>GDP</th>
            <th>HDI</th>
            <th>Population</th>
            <th>CO₂</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((city) => (
            <tr key={city.city}>
              <td>{city.city}</td>
              <td>{city.gdp}</td>
              <td>{city.hdi}</td>
              <td>{city.population}</td>
              <td>{city.co2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
