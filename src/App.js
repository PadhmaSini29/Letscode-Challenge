import React, { useState } from 'react';
import data from './data/cities.json';
import CityBarChart from './components/CityBarChart';
import CityStatsCharts from './components/CityStatsCharts';
import CityRankingTable from './components/CityRankingTable';
import ExportCSVButton from './components/ExportCSVButton';
import GDPForecastChart from './components/GDPForecastChart';
import CityInsights from './components/CityInsights';
import CityLineChart from './components/CityLineChart';
import PolicyTips from './components/PolicyTips';
import HealthStatsChart from './components/HealthStatsChart';
import CityScatterChart from './components/CityScatterChart';
import CityMapChart from './components/CityMapChart';
import ExportPDFButton from './components/ExportPDFButton';
import GoalProgress from './components/GoalProgress';

import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [co2Reduction, setCo2Reduction] = useState(0);
  const [gdpGrowthRate, setGdpGrowthRate] = useState(5);
  const [hdiMin, setHdiMin] = useState(0);
  const [healthcareBoost, setHealthcareBoost] = useState(0); // NEW slider

  // Filter data
  const filteredData = data.filter(item => {
    const matchesCity = selectedCity === "All" || item.city === selectedCity;
    const matchesHDI = item.hdi >= hdiMin;
    return matchesCity && matchesHDI;
  });

  // Apply "What If" simulations
  const adjustedData = filteredData.map(city => {
    const newCO2 = parseFloat((city.co2 * (1 - co2Reduction / 100)).toFixed(2));
    const simulatedHealthcare = city.healthcareSpendingPerCapita + healthcareBoost;

    // Simulated metrics
    const simulatedLifeExpectancy = parseFloat(
      (city.lifeExpectancy + healthcareBoost * 0.002).toFixed(1)
    );

    const simulatedEPI = parseFloat(
      (city.environmentalPerformanceIndex + (city.co2 - newCO2) * 2).toFixed(1)
    );

    return {
      ...city,
      co2: newCO2,
      healthcareSpendingPerCapita: simulatedHealthcare,
      lifeExpectancy: simulatedLifeExpectancy,
      environmentalPerformanceIndex: simulatedEPI
    };
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌍 City Comparison Dashboard</h1>
      </header>

      <div className="app-body">
        {/* Sidebar */}
        <aside className="app-sidebar">
          <h2>Filters</h2>

          <label htmlFor="city-select"><strong>City:</strong></label><br />
          <select
            id="city-select"
            aria-label="Select city"
            onChange={(e) => setSelectedCity(e.target.value)}
            value={selectedCity}
          >
            <option value="All">All Cities</option>
            {data.map(item => (
              <option key={item.city} value={item.city}>{item.city}</option>
            ))}
          </select>

          <br /><br />

          <label htmlFor="hdi-slider"><strong>Minimum HDI:</strong> {hdiMin.toFixed(2)}</label><br />
          <input
            id="hdi-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={hdiMin}
            onChange={(e) => setHdiMin(parseFloat(e.target.value))}
            aria-label="Minimum HDI filter"
          />

          <br /><br />

          <label htmlFor="co2-slider"><strong>CO₂ Reduction:</strong> {co2Reduction}%</label><br />
          <input
            id="co2-slider"
            type="range"
            min="0"
            max="100"
            value={co2Reduction}
            onChange={(e) => setCo2Reduction(Number(e.target.value))}
            aria-label="Simulated CO₂ reduction"
          />

          <br /><br />

          <label htmlFor="gdp-slider"><strong>GDP Growth:</strong> {gdpGrowthRate}%</label><br />
          <input
            id="gdp-slider"
            type="range"
            min="0"
            max="20"
            value={gdpGrowthRate}
            onChange={(e) => setGdpGrowthRate(Number(e.target.value))}
            aria-label="GDP growth rate"
          />

          <br /><br />

          <label htmlFor="healthcare-slider"><strong>🏥 Healthcare Boost:</strong> +${healthcareBoost} per capita</label><br />
          <input
            id="healthcare-slider"
            type="range"
            min="0"
            max="5000"
            step="100"
            value={healthcareBoost}
            onChange={(e) => setHealthcareBoost(Number(e.target.value))}
            aria-label="Healthcare spending simulation"
          />

          <br /><br />
          <ExportCSVButton data={adjustedData} />
        </aside>

        {/* Main */}
        <main id="export-section" className="app-main">
          {adjustedData.map(city => (
            <div key={city.city}>
              <h2>{city.city}</h2>
              <GoalProgress city={city} />
            </div>
          ))}

          <CityBarChart data={adjustedData} />
          <CityStatsCharts data={adjustedData} />
          <CityRankingTable data={adjustedData} />
          <GDPForecastChart data={filteredData} growthRate={gdpGrowthRate} />
          <CityInsights data={adjustedData} />
          <CityLineChart data={filteredData} />
          <PolicyTips data={adjustedData} />
          <HealthStatsChart data={adjustedData} />
          <CityScatterChart data={adjustedData} />
          <CityMapChart data={adjustedData} metric="hdi" />
          <ExportPDFButton targetId="export-section" />
        </main>
      </div>
    </div>
  );
}

export default App;
