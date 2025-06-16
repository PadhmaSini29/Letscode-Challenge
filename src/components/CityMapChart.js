import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function CityMapChart({ data, metric = "hdi" }) {
  const geoCoordMap = {};
  const formattedData = data.map(city => {
    geoCoordMap[city.city] = city.coords; // Assume coords: [lon, lat]
    return {
      name: city.city,
      value: [...city.coords, city[metric]],
    };
  });

  const option = {
    title: {
      text: `🌍 City Map Colored by ${metric.toUpperCase()}`,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return `${params.name}<br/>${metric.toUpperCase()}: ${params.value[2]}`;
      },
    },
    visualMap: {
      min: 0,
      max: metric === 'hdi' ? 1 : 2000,
      left: 'right',
      top: 'bottom',
      text: ['High', 'Low'],
      calculable: true,
      inRange: {
        color: ['#e0f3f8', '#0077b6'],
      },
    },
    geo: {
      map: 'world',
      roam: true,
      itemStyle: {
        areaColor: '#eeeeee',
        borderColor: '#999',
      },
    },
    series: [
      {
        name: 'City Data',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: formattedData,
        symbolSize: 12,
        label: {
          show: false,
        },
        itemStyle: {
          color: '#005f73',
        },
      },
    ],
  };

  return (
    <div style={{ marginTop: "2rem", height: 500 }}>
      <ReactECharts option={option} style={{ height: '100%' }} />
    </div>
  );
}
