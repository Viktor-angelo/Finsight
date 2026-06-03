import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

const data = [
  { name: "May 1", value: 400 },
  { name: "May 8", value: 800 },
  { name: "May 15", value: 600 },
  { name: "May 22", value: 1200 },
  { name: "May 29", value: 2000 },
];

export default function Chart() {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />

          <XAxis
            dataKey="name"
            stroke="#aaa"
            tick={{ fill: "#aaa", fontSize: 12 }}
          />

          <YAxis stroke="#aaa" tick={{ fill: "#aaa", fontSize: 12 }} />

          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              color: "white",
            }}
            cursor={{ stroke: "#3B82F6", strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill="url(#colorLine)"
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#3B82F6",
              stroke: "#020617",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "#fff",
              stroke: "#3B82F6",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
