import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function HealthStatsChart({ data }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>🏥 Physicians & Hospital Beds per 1000 People</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="physiciansPer1000" fill="#8884d8" name="Physicians" />
          <Bar dataKey="hospitalBedsPer1000" fill="#82ca9d" name="Hospital Beds" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
