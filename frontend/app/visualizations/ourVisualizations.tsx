import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from "recharts";

// Types
type CountItem = { name: string; count: number };
type SeverityItem = { name: string; value: number };
type TimelinePoint = { x: number; y: number; name: string };

// Constants
const COLORS: Record<string, string> = {
  mild: "#90ee90",
  moderate: "#f4c542",
  severe: "#f87171",
};

const App: React.FC = () => {
  const [specialtiesRaw, setSpecialtiesRaw] = useState<CountItem[]>([]);
  const [specialtiesMerged, setSpecialtiesMerged] = useState<CountItem[]>([]);
  const [severityData, setSeverityData] = useState<SeverityItem[]>([]);
  const [timelineData, setTimelineData] = useState<TimelinePoint[]>([]);

  useEffect(() => {
    fetch("https://texasmindbridgeapi.me/providers", {
      headers: { "x-api-key": "your-api-key-here" }
    })
      .then((res) => res.json())
      .then((json) => {
        setSpecialtiesRaw(processSpecialties(json.results));
        setSpecialtiesMerged(processMergedSpecialties(json.results));
      });
  }, []);

  useEffect(() => {
    fetch("https://texasmindbridgeapi.me/symptoms", {
      headers: { "x-api-key": "your-api-key-here" }
    })
      .then((res) => res.json())
      .then((json) => {
        const tally: Record<string, number> = {};
        (json.results || []).forEach((s: any) => {
          if (s.severity) tally[s.severity] = (tally[s.severity] || 0) + 1;
        });
        const formatted = Object.entries(tally).map(
          ([name, value]) => ({ name, value })
        );
        setSeverityData(formatted);
      });
  }, []);

  useEffect(() => {
    fetch("https://texasmindbridgeapi.me/SupportGroups", {
      headers: { "x-api-key": "your-api-key-here" }
    })
      .then((res) => res.json())
      .then((json) => {
        const allGroups = json.results.slice(0, 25);
        const timeline = allGroups
  .filter((g: any) => g.meeting_date && g.meeting_time && g.meeting_time.includes(":"))
  .map((g: any, i: number) => {
    const [h, m] = g.meeting_time.split(":").map(Number);
    return {
      x: new Date(g.meeting_date).getTime() + i * 1000000,
      y: h + m / 60,
      name: g.group_name,
    };
  });

        setTimelineData(timeline);
      });
  }, []);

  const processSpecialties = (providers: any[]): CountItem[] => {
    const counts: Record<string, number> = {};
    providers.forEach((p: any) => {
      const list = p.specialization?.split(",").map((s: string) => s.trim()) || [];
      list.forEach((s: string) => (counts[s] = (counts[s] || 0) + 1));
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));
  };

  const processMergedSpecialties = (providers: any[]): CountItem[] => {
    const counts: Record<string, number> = {};
    const normalize = (raw: string) => {
      const r = raw.toLowerCase();
      if (r.includes("psychiat")) return "Psychiatry";
      if (r.includes("neuro")) return "Neurology";
      if (r.includes("counsel")) return "Counseling";
      if (r.includes("mental health")) return "Mental Health";
      if (r.includes("psycholog")) return "Psychology";
      if (r.includes("family")) return "Family Medicine";
      if (r.includes("internal")) return "Internal Medicine";
      if (r.includes("pediatric")) return "Pediatrics";
      return raw.trim();
    };
    providers.forEach((p: any) => {
      const list = p.specialization?.split(",").map((s: string) => normalize(s)) || [];
      list.forEach((s: string) => (counts[s] = (counts[s] || 0) + 1));
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>Top 10 Raw Specialties</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={specialtiesRaw} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" allowDecimals={false} />
          <YAxis type="category" dataKey="name" width={200} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8">
            <LabelList dataKey="count" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <h2>Top 10 Merged Specialties</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={specialtiesMerged} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" allowDecimals={false} />
          <YAxis type="category" dataKey="name" width={200} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d">
            <LabelList dataKey="count" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <h2>Severity Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={severityData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label={({ name }) => name}
          >
            {severityData.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "#ccc"} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <h2>Support Groups Timeline (Date vs Time)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 50 }}>
          <CartesianGrid />
          <XAxis
            dataKey="x"
            name="Date"
            domain={['auto', 'auto']}
            type="number"
            tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
          />
          <YAxis
            dataKey="y"
            name="Time"
            domain={[0, 24]}
            tickFormatter={(time) => `${Math.floor(time)}:00`}
            label={{ value: "Hour of Day", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value: number, name: string) =>
              name === "y" ? `${Math.floor(value)}:00` : value
            }
            labelFormatter={(value) => new Date(value).toLocaleString()}
          />
          <Legend />
          <Scatter name="Support Group" data={timelineData} fill="#82ca9d" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;