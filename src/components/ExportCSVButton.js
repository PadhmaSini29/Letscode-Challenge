import React from 'react';
import { CSVLink } from 'react-csv';

export default function ExportCSVButton({ data }) {
  const headers = [
    { label: "City", key: "city" },
    { label: "GDP", key: "gdp" },
    { label: "HDI", key: "hdi" },
    { label: "Population", key: "population" },
    { label: "CO₂", key: "co2" }
  ];

  return (
    <div style={{ margin: "1rem 0" }}>
      <CSVLink
        data={data}
        headers={headers}
        filename={"city_comparison_data.csv"}
        className="btn"
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          textDecoration: "none",
          cursor: "pointer"
        }}
      >
        ⬇️ Download Table as CSV
      </CSVLink>
    </div>
  );
}
