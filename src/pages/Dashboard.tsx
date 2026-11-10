import {
  Ticket,
  Clock3,
  CheckCircle2,
  Users,
  ArrowUpRight,
  Bot,
} from "lucide-react";
import StatCard from "../components/StatCard";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const recentTickets = [
  {
    id: "#HD-1042",
    subject: "Unable to reset account password",
    customer: "Sarah Johnson",
    initials: "SJ",
    status: "Open",
    priority: "High",
    date: "Today, 09:42 AM",
  },
  {
    id: "#HD-1041",
    subject: "Payment confirmation not received",
    customer: "Michael Chen",
    initials: "MC",
    status: "In Progress",
    priority: "Urgent",
    date: "Today, 08:30 AM",
  },
  {
    id: "#HD-1040",
    subject: "Dashboard loading very slowly",
    customer: "Emily Davis",
    initials: "ED",
    status: "Resolved",
    priority: "Low",
    date: "Yesterday",
  },
  {
    id: "#HD-1039",
    subject: "Need help updating billing details",
    customer: "David Wilson",
    initials: "DW",
    status: "Open",
    priority: "Medium",
    date: "Yesterday",
  },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Good morning, John 👋</h1>
          <p>Here's what's happening with your support team today.</p>
        </div>

        <button
          className="outline-button"
          onClick={() => onNavigate("Analytics")}
        >
          <ArrowUpRight size={17} />
          View reports
        </button>
      </div>

      <section className="stats-grid">
        <StatCard
          title="Total Tickets"
          value="1,284"
          change="+12.8%"
          positive={true}
          icon={Ticket}
          description="vs. last month"
        />

        <StatCard
          title="Open Tickets"
          value="248"
          change="+4.2%"
          positive={false}
          icon={Clock3}
          description="vs. last month"
        />

        <StatCard
          title="Resolved Tickets"
          value="936"
          change="+18.6%"
          positive={true}
          icon={CheckCircle2}
          description="vs. last month"
        />

        <StatCard
          title="Active Customers"
          value="3,642"
          change="+8.4%"
          positive={true}
          icon={Users}
          description="vs. last month"
        />
      </section>

      <section className="dashboard-grid">
        <div className="panel ticket-panel">
          <div className="panel-header">
            <div>
              <h3>Recent tickets</h3>
              <p>Track and manage your latest support requests.</p>
            </div>
          </div>

          <div className="ticket-table-wrapper">
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>TICKET</th>
                  <th>CUSTOMER</th>
                  <th>STATUS</th>
                  <th>PRIORITY</th>
                  <th>DATE</th>
                </tr>
              </thead>

              <tbody>
                {recentTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>
                      <strong>{ticket.id}</strong>
                      <span className="ticket-subject">
                        {ticket.subject}
                      </span>
                    </td>

                    <td>
                      <div className="customer-cell">
                        <div className="small-avatar">
                          {ticket.initials}
                        </div>
                        {ticket.customer}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${ticket.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`priority-badge ${ticket.priority.toLowerCase()}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>

                    <td className="date-cell">{ticket.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="view-all-button"
            onClick={() => onNavigate("Tickets")}
          >
            View all tickets <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="side-panels">
          <div className="panel ai-panel">
            <div className="ai-icon">
              <Bot size={23} />
            </div>

            <span className="ai-label">AI ASSISTANT</span>

            <h3>Work smarter with AI</h3>

            <p>
              Get intelligent reply suggestions, ticket summaries
              and support insights in seconds.
            </p>

            <button
              className="ai-button"
              onClick={() => onNavigate("AI Assistant")}
            >
              Explore AI Assistant <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="panel activity-panel">
            <div className="panel-header">
              <div>
                <h3>Team activity</h3>
                <p>Today's support performance</p>
              </div>
            </div>

            <div className="activity-stat">
              <div>
                <span>Tickets resolved</span>
                <strong>32</strong>
              </div>

              <div className="activity-icon green">
                <CheckCircle2 size={19} />
              </div>
            </div>

            <div className="activity-stat">
              <div>
                <span>Pending responses</span>
                <strong>14</strong>
              </div>

              <div className="activity-icon orange">
                <Clock3 size={19} />
              </div>
            </div>

            <div className="activity-stat">
              <div>
                <span>New customers</span>
                <strong>18</strong>
              </div>

              <div className="activity-icon purple">
                <Users size={19} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
