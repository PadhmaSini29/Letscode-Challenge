import React from 'react';
import './GoalProgress.css'; // Optional CSS for styling

const getColor = (value, goal, reverse = false) => {
  const percent = reverse ? 1 - value / goal : value / goal;
  if (percent >= 1) return '#4CAF50'; // green
  if (percent >= 0.75) return '#FFC107'; // yellow
  return '#F44336'; // red
};

const GoalProgress = ({ city }) => {
  const metrics = [
    {
      label: "HDI",
      value: city.hdi,
      goal: 0.9,
      reverse: false,
    },
    {
      label: "Literacy Rate",
      value: city.literacyRate,
      goal: 100,
      reverse: false,
    },
    {
      label: "CO₂ Emissions (↓ good)",
      value: city.co2,
      goal: 2.0, // target is to keep below 2.0
      reverse: true,
    },
  ];

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>🎯 Goal Tracking</h3>
      {metrics.map((metric) => {
        const progress = Math.min((metric.reverse
          ? metric.goal / metric.value
          : metric.value / metric.goal) * 100, 100);
        const color = getColor(metric.value, metric.goal, metric.reverse);
        return (
          <div key={metric.label} style={{ marginBottom: "0.8rem" }}>
            <strong>{metric.label}:</strong> {metric.value}
            <div
              style={{
                background: "#eee",
                height: "10px",
                borderRadius: "5px",
                overflow: "hidden",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: color,
                  transition: "width 0.5s",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GoalProgress;
