import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  SlidersHorizontal,
  MessageSquare,
  X,
  MoreHorizontal,
} from "lucide-react";

type TicketStatus = "Open" | "In Progress" | "Resolved";
type TicketPriority = "Low" | "Medium" | "High" | "Urgent";

interface SupportTicket {
  id: string;
  subject: string;
  customer: string;
  status: TicketStatus;
  priority: TicketPriority;
  date: string;
}

const initialTickets: SupportTicket[] = [
  {
    id: "HD-1042",
    subject: "Unable to reset account password",
    customer: "Sarah Johnson",
    status: "Open",
    priority: "High",
    date: "Nov 10, 2026",
  },
  {
    id: "HD-1041",
    subject: "Payment confirmation not received",
    customer: "Michael Chen",
    status: "In Progress",
    priority: "Urgent",
    date: "Nov 10, 2026",
  },
  {
    id: "HD-1040",
    subject: "Dashboard loading very slowly",
    customer: "Emily Davis",
    status: "Resolved",
    priority: "Low",
    date: "Nov 9, 2026",
  },
  {
    id: "HD-1039",
    subject: "Need help updating billing details",
    customer: "David Wilson",
    status: "Open",
    priority: "Medium",
    date: "Nov 9, 2026",
  },
  {
    id: "HD-1038",
    subject: "Unable to access my account",
    customer: "Olivia Brown",
    status: "In Progress",
    priority: "High",
    date: "Nov 8, 2026",
  },
  {
    id: "HD-1037",
    subject: "Request for subscription cancellation",
    customer: "James Taylor",
    status: "Resolved",
    priority: "Medium",
    date: "Nov 8, 2026",
  },
];

export default function Tickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const [subject, setSubject] = useState("");
  const [customer, setCustomer] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("Medium");
  const [formError, setFormError] = useState("");

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        `${ticket.id} ${ticket.subject} ${ticket.customer}`
          .toLowerCase()
          .includes(query);

      const matchesFilter = filter === "All" || ticket.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter, tickets]);

  function handleCreateTicket(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const cleanSubject = subject.trim();
    const cleanCustomer = customer.trim();

    if (!cleanSubject || !cleanCustomer) {
      setFormError("Please complete all fields.");
      return;
    }

    const highestId = Math.max(
      1042,
      ...tickets.map((ticket) => Number(ticket.id.replace("HD-", "")) || 0),
    );

    const newTicket: SupportTicket = {
      id: `HD-${highestId + 1}`,
      subject: cleanSubject,
      customer: cleanCustomer,
      status: "Open",
      priority,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setTickets((previous) => [newTicket, ...previous]);
    setSubject("");
    setCustomer("");
    setPriority("Medium");
    setShowForm(false);
    setSearch("");
    setFilter("All");
  }

  function updateTicketStatus(id: string, status: TicketStatus) {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket,
      ),
    );
    setSelectedTicket(null);
  }

  function deleteTicket(id: string) {
    setTickets((previous) =>
      previous.filter((ticket) => ticket.id !== id),
    );
    setSelectedTicket(null);
  }

  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">SUPPORT MANAGEMENT</p>
          <h1>Tickets</h1>
          <p>Manage and track all customer support requests.</p>
        </div>

        <button
          className="create-ticket-button"
          onClick={() => {
            setFormError("");
            setShowForm(true);
          }}
        >
          <Plus size={17} />
          New ticket
        </button>
      </div>

      {showForm && (
        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Create a new ticket</h3>
              <p>Add a customer support request.</p>
            </div>

            <button
              className="icon-button"
              aria-label="Close form"
              onClick={() => setShowForm(false)}
            >
              <X size={19} />
            </button>
          </div>

          <form className="customer-add-form" onSubmit={handleCreateTicket}>
            <input
              type="text"
              placeholder="Ticket subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Customer name"
              value={customer}
              onChange={(event) => setCustomer(event.target.value)}
              required
            />

            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as TicketPriority)
              }
            >
              <option value="Low">Low priority</option>
              <option value="Medium">Medium priority</option>
              <option value="High">High priority</option>
              <option value="Urgent">Urgent priority</option>
            </select>

            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}

            <button type="submit" className="create-ticket-button">
              <Plus size={17} />
              Create ticket
            </button>
          </form>
        </section>
      )}

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>All support tickets</h3>
            <p>{filteredTickets.length} tickets found</p>
          </div>
        </div>

        <div className="ticket-controls">
          <div className="ticket-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tickets or customers..."
              aria-label="Search tickets"
            />
          </div>

          <div className="ticket-filter">
            <SlidersHorizontal size={16} />
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter tickets by status"
            >
              <option value="All">All statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
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
                <th>CREATED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <strong>#{ticket.id}</strong>
                    <span className="ticket-subject">{ticket.subject}</span>
                  </td>

                  <td>{ticket.customer}</td>

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

                  <td>
                    <button
                      className="icon-button"
                      title="Ticket actions"
                      aria-label={`Actions for ${ticket.id}`}
                      onClick={() =>
                        setSelectedTicket(
                          selectedTicket === ticket.id ? null : ticket.id,
                        )
                      }
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {selectedTicket === ticket.id && (
                      <div className="customer-action-menu">
                        <button
                          onClick={() =>
                            updateTicketStatus(ticket.id, "Open")
                          }
                        >
                          Mark as Open
                        </button>

                        <button
                          onClick={() =>
                            updateTicketStatus(ticket.id, "In Progress")
                          }
                        >
                          Mark In Progress
                        </button>

                        <button
                          onClick={() =>
                            updateTicketStatus(ticket.id, "Resolved")
                          }
                        >
                          Mark as Resolved
                        </button>

                        <button onClick={() => deleteTicket(ticket.id)}>
                          Delete ticket
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTickets.length === 0 && (
            <div className="empty-state">
              <MessageSquare size={28} />
              <strong>No tickets found</strong>
              <span>Try another search or change your status filter.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
