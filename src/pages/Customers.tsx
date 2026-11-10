import { useMemo, useState } from "react";
import {
  Search,
  Mail,
  UserPlus,
  MoreHorizontal,
  X,
} from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  company: string;
  tickets: number;
  status: "Active" | "Inactive";
  initials: string;
}

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Olivia Bennett",
    email: "olivia@example.com",
    company: "Northstar Studio",
    tickets: 12,
    status: "Active",
    initials: "OB",
  },
  {
    id: 2,
    name: "James Wilson",
    email: "james@example.com",
    company: "Wilson & Co.",
    tickets: 8,
    status: "Active",
    initials: "JW",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    email: "sophia@example.com",
    company: "Pixel House",
    tickets: 5,
    status: "Active",
    initials: "SM",
  },
  {
    id: 4,
    name: "Ethan Thompson",
    email: "ethan@example.com",
    company: "Thompson Group",
    tickets: 3,
    status: "Inactive",
    initials: "ET",
  },
  {
    id: 5,
    name: "Ava Robinson",
    email: "ava@example.com",
    company: "Bright Solutions",
    tickets: 17,
    status: "Active",
    initials: "AR",
  },
  {
    id: 6,
    name: "Noah Anderson",
    email: "noah@example.com",
    company: "Anderson Digital",
    tickets: 6,
    status: "Inactive",
    initials: "NA",
  },
];

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(
    null,
  );
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [formError, setFormError] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.company.toLowerCase().includes(query),
    );
  }, [search, customers]);

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active",
  ).length;

  const averageTickets =
    totalCustomers > 0
      ? (
          customers.reduce((total, customer) => total + customer.tickets, 0) /
          totalCustomers
        ).toFixed(1)
      : "0.0";

  function handleAddCustomer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const name = newName.trim();
    const email = newEmail.trim().toLowerCase();
    const company = newCompany.trim();

    if (!name || !email || !company) {
      setFormError("Please complete all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (customers.some((customer) => customer.email === email)) {
      setFormError("A customer with this email already exists.");
      return;
    }

    const initials = name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newCustomer: Customer = {
      id: Math.max(0, ...customers.map((customer) => customer.id)) + 1,
      name,
      email,
      company,
      tickets: 0,
      status: "Active",
      initials,
    };

    setCustomers((previous) => [newCustomer, ...previous]);
    setNewName("");
    setNewEmail("");
    setNewCompany("");
    setShowAddForm(false);
    setSearch("");
  }

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h2>Customers</h2>
          <p>Manage your customers and their support history.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setFormError("");
            setShowAddForm(true);
          }}
        >
          <UserPlus size={17} />
          Add customer
        </button>
      </div>

      {showAddForm && (
        <div className="customer-table-card" role="dialog" aria-modal="true" aria-labelledby="add-customer-title">
          <div className="customer-toolbar">
            <div>
              <h3 id="add-customer-title">Add new customer</h3>
              <p>Enter the customer's account details.</p>
            </div>

            <button
              className="icon-button"
              title="Close form"
              aria-label="Close form"
              onClick={() => setShowAddForm(false)}
            >
              <X size={19} />
            </button>
          </div>

          <form onSubmit={handleAddCustomer} className="customer-add-form">
            <input
              type="text"
              placeholder="Customer name"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email address"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Company"
              value={newCompany}
              onChange={(event) => setNewCompany(event.target.value)}
              required
            />

            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}

            <button type="submit" className="primary-button">
              <UserPlus size={16} />
              Save customer
            </button>
          </form>
        </div>
      )}

      <div className="customer-summary">
        <div className="summary-card">
          <span>Total customers</span>
          <strong>{totalCustomers.toLocaleString()}</strong>
          <small>Sample accounts</small>
        </div>

        <div className="summary-card">
          <span>Active customers</span>
          <strong>{activeCustomers.toLocaleString()}</strong>
          <small>Currently active</small>
        </div>

        <div className="summary-card">
          <span>Average tickets</span>
          <strong>{averageTickets}</strong>
          <small>Per customer</small>
        </div>
      </div>

      <div className="customer-table-card">
        <div className="customer-toolbar">
          <div>
            <h3>All customers</h3>
            <p>Browse and manage customer accounts.</p>
          </div>

          <div className="customer-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search customers"
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Company</th>
                <th>Tickets</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-identity">
                      <div className="customer-avatar">
                        {customer.initials}
                      </div>

                      <div>
                        <strong>{customer.name}</strong>
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{customer.company}</td>

                  <td>{customer.tickets}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        customer.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="icon-button"
                      title={`Email ${customer.name}`}
                      aria-label={`Email ${customer.name}`}
                      onClick={() => {
                        window.location.href = `mailto:${customer.email}`;
                      }}
                    >
                      <Mail size={17} />
                    </button>
                  </td>

                  <td>
                    <button
                      className="icon-button"
                      title="More options"
                      aria-label={`More options for ${customer.name}`}
                      onClick={() =>
                        setSelectedCustomer(
                          selectedCustomer === customer.id
                            ? null
                            : customer.id,
                        )
                      }
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {selectedCustomer === customer.id && (
                      <div className="customer-action-menu">
                        <button
                          onClick={() => {
                            setCustomers((previous) =>
                              previous.map((item) =>
                                item.id === customer.id
                                  ? {
                                      ...item,
                                      status:
                                        item.status === "Active"
                                          ? "Inactive"
                                          : "Active",
                                    }
                                  : item,
                              ),
                            );
                            setSelectedCustomer(null);
                          }}
                        >
                          {customer.status === "Active"
                            ? "Deactivate customer"
                            : "Activate customer"}
                        </button>

                        <button
                          onClick={() => {
                            setCustomers((previous) =>
                              previous.filter(
                                (item) => item.id !== customer.id,
                              ),
                            );
                            setSelectedCustomer(null);
                          }}
                        >
                          Delete customer
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCustomers.length === 0 && (
            <div className="empty-state">
              <Search size={25} />
              <strong>No customers found</strong>
              <p>Try searching with another name, email, or company.</p>
            </div>
          )}
        </div>

        <div className="table-footer">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>
    </div>
  );
}
