import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  Label,
} from "recharts";

export default function Chart({ income, expenses, balance }) {
  const COLORS = ["#4ade80", "#f87171", "#60a5fa"];
  const data = [
    { name: "Income", value: income },
    { name: "Expenses", value: expenses },
    {
      name: balance >= 0 ? "Savings" : "Debt",
      value: Math.abs(balance),
    },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
          >
            <Label value="Finance" position="center" />

            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}