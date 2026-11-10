
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Ticket,
  Clock3,
  CheckCircle2,
  Users,
} from "lucide-react";

const weeklyData = [
  { day: "Mon", received: 42, resolved: 35 },
  { day: "Tue", received: 55, resolved: 46 },
  { day: "Wed", received: 38, resolved: 32 },
  { day: "Thu", received: 64, resolved: 51 },
  { day: "Fri", received: 49, resolved: 43 },
  { day: "Sat", received: 31, resolved: 28 },
  { day: "Sun", received: 25, resolved: 22 },
];

const performance = [
  { label: "First response time", value: "4m 32s", change: "12% faster" },
  { label: "Resolution rate", value: "92.4%", change: "6.8% increase" },
  { label: "Customer satisfaction", value: "96.8%", change: "3.2% increase" },
];

export default function Analytics() {
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h2>Analytics</h2>
          <p>Monitor support performance and customer service trends.</p>
        </div>
        <span className="ai-status">Last 7 days · Demo data</span>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Total tickets</span>
            <Ticket size={19} />
          </div>
          <strong className="stat-value">304</strong>
          <span className="stat-change positive">
            <TrendingUp size={14} /> 12.8% this week
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Resolved tickets</span>
            <CheckCircle2 size={19} />
          </div>
          <strong className="stat-value">257</strong>
          <span className="stat-change positive">
            <TrendingUp size={14} /> 8.6% this week
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Average response</span>
            <Clock3 size={19} />
          </div>
          <strong className="stat-value">4m 32s</strong>
          <span className="stat-change positive">12% faster</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Customers helped</span>
            <Users size={19} />
          </div>
          <strong className="stat-value">186</strong>
          <span className="stat-change positive">This week</span>
        </div>
      </div>

      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h3>Ticket activity</h3>
            <p>Tickets received compared with tickets resolved.</p>
          </div>
        </div>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} barGap={8}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#292e38"
              />
              <XAxis
                dataKey="day"
                stroke="#9298a5"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#9298a5"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#171b24",
                  border: "1px solid #303642",
                  borderRadius: "10px",
                  color: "#ffffff",
                }}
              />
              <Bar
                dataKey="received"
                name="Received"
                fill="#8b7cff"
                radius={[5, 5, 0, 0]}
              />
              <Bar
                dataKey="resolved"
                name="Resolved"
                fill="#39c6a5"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel" style={{ marginTop: "24px" }}>
        <div className="panel-header">
          <div>
            <h3>Support performance</h3>
            <p>Key service performance indicators.</p>
          </div>
        </div>

        <div className="activity-panel">
          {performance.map((item) => (
            <div className="activity-stat" key={item.label}>
              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
              <span className="stat-change positive">{item.change}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
