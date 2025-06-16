export function clusterCity(city) {
  const { hdi, gdp, co2 } = city;

  // Simple scoring logic
  let score = 0;
  if (hdi >= 0.85) score += 2;
  else if (hdi >= 0.7) score += 1;

  if (gdp >= 1500) score += 2;
  else if (gdp >= 1000) score += 1;

  if (co2 <= 3.5) score += 2;
  else if (co2 <= 5) score += 1;

  if (score >= 5) return 'high';
  if (score >= 3) return 'medium';
  return 'low';
}
