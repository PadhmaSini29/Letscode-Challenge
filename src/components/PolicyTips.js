import React from 'react';

export default function PolicyTips({ data }) {
  if (!data || data.length === 0) return null;

  // Generate suggestions based on thresholds
  const tips = [];

  data.forEach(city => {
    const messages = [];

    if (city.hdi < 0.7) {
      messages.push("💡 Suggest investing in education and healthcare");
    }
    if (city.co2 > 5) {
      messages.push("💡 Recommend switching to renewable energy sources");
    }
    if (city.giniCoefficient > 0.45) {
      messages.push("💡 Consider policies to reduce income inequality");
    }
    if (city.povertyRate > 20) {
      messages.push("💡 Focus on poverty reduction and employment programs");
    }

    if (messages.length > 0) {
      tips.push({
        city: city.city,
        messages
      });
    }
  });

  if (tips.length === 0) return null;

  return (
    <div style={{
      marginTop: '2rem',
      padding: '1rem',
      background: '#fff6e5',
      borderLeft: '6px solid #ffc107',
      borderRadius: '6px'
    }}>
      <h2>🧭 Policy Suggestions</h2>
      {tips.map((tip, idx) => (
        <div key={idx} style={{ marginBottom: '1rem' }}>
          <strong>{tip.city}</strong>
          <ul>
            {tip.messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
