// src/Visualizations.tsx

import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList
} from "recharts";

const Visualizations: React.FC = () => {
  const [agencies, setAgencies] = useState<any[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      let allDepartments: any[] = [];
      for (let page = 1; page <= 5; page++) {
        try {
          const res = await fetch(`https://justicewatch.me/api/agencies?page=${page}`);
          const json = await res.json();
          allDepartments = [...allDepartments, ...(json.departments || [])];
        } catch (err) {
          console.error("API fetch error on page", page, err);
        }
      }
      setAgencies(allDepartments);
    };

    fetchPages();
  }, []);

  const populationData = agencies
    .filter((dept: any) => dept.state && dept.total_population)
    .reduce((acc: any, dept: any) => {
      acc[dept.state] = (acc[dept.state] || 0) + parseInt(dept.total_population || "0");
      return acc;
    }, {});

  const barData = Object.entries(populationData)
    .map(([state, value]) => ({ state, population: value }))
    .sort((a, b) => Number(b.population) - Number(a.population))
    .slice(0, 10);

  const scoreScatterData = agencies
    .filter((d: any) => d.calc_police_violence_score && d.calc_overall_score)
    .map((d: any) => ({
      x: parseInt(d.calc_police_violence_score.replace("%", "")),
      y: parseInt(d.calc_overall_score.replace("%", "")),
      name: d.location_name,
    }));

  const histogramBuckets = {
    '0–500k': { total: 0, count: 0 },
    '500k–1M': { total: 0, count: 0 },
    '1M–2M': { total: 0, count: 0 },
    '2M–5M': { total: 0, count: 0 },
    '>5M': { total: 0, count: 0 },
  };

  agencies.forEach((d: any) => {
    const pop = parseInt(d.total_population?.replace(/,/g, "") || "0");
    const vscore = parseInt(d.calc_police_violence_score?.replace("%", "") || "0");
    if (!pop || !vscore) return;

    if (pop < 500000) {
      histogramBuckets['0–500k'].total += vscore;
      histogramBuckets['0–500k'].count++;
    } else if (pop < 1000000) {
      histogramBuckets['500k–1M'].total += vscore;
      histogramBuckets['500k–1M'].count++;
    } else if (pop < 2000000) {
      histogramBuckets['1M–2M'].total += vscore;
      histogramBuckets['1M–2M'].count++;
    } else if (pop < 5000000) {
      histogramBuckets['2M–5M'].total += vscore;
      histogramBuckets['2M–5M'].count++;
    } else {
      histogramBuckets['>5M'].total += vscore;
      histogramBuckets['>5M'].count++;
    }
  });

  const histogramData = Object.entries(histogramBuckets)
    .filter(([, { count }]) => count > 0)
    .map(([range, { total, count }]) => ({
      range,
      avgViolence: count > 0 ? Math.round(total / count) : 0
    }));

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Top 10 States by Population Covered</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData} layout="vertical" margin={{ top: 20, right: 30, bottom: 20, left: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="state" />
          <Tooltip />
          <Legend />
          <Bar dataKey="population" fill="#82ca9d">
            <LabelList dataKey="population" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <h2>Violence Score vs Overall Score</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 50 }}>
          <CartesianGrid />
          <XAxis dataKey="x" name="Violence Score (%)" type="number" domain={[0, 100]} />
          <YAxis dataKey="y" name="Overall Score (%)" type="number" domain={[0, 100]} />
          <Tooltip formatter={(val: number) => `${val}%`} labelFormatter={(_, payload) => payload?.[0]?.payload?.name} />
          <Legend />
          <Scatter name="Departments" data={scoreScatterData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <h2>Average Violence Score by Population Range</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={histogramData} margin={{ top: 20, right: 30, bottom: 20, left: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgViolence" fill="#8884d8">
            <LabelList dataKey="avgViolence" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

 export default Visualizations;


