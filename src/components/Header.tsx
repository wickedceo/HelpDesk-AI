import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Plus,
  X,
  LayoutDashboard,
  Ticket,
  Users,
  Bot,
  ChartNoAxesCombined,
  User,
  Settings,
  LogOut,
  CheckCheck,
} from "lucide-react";

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const pages = [
  { name: "Dashboard", description: "Workspace overview", icon: LayoutDashboard },
  { name: "Tickets", description: "Manage support tickets", icon: Ticket },
  { name: "Customers", description: "Customer accounts", icon: Users },
  { name: "AI Assistant", description: "AI writing assistant", icon: Bot },
  { name: "Analytics", description: "Reports and performance", icon: ChartNoAxesCombined },
];

export default function Header({ activePage, onNavigate }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const filteredPages = pages.filter((page) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      page.name.toLowerCase().includes(query) ||
      page.description.toLowerCase().includes(query)
    );
  });

  function navigateTo(page: string) {
    onNavigate(page);
    setSearchOpen(false);
    setSearchQuery("");
    setNotificationsOpen(false);
    setProfileOpen(false);
  }

  function openSearch() {
    setSearchOpen(true);
    setNotificationsOpen(false);
    setProfileOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      searchRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <header className="main-header">
      <div className="header-title">
        <span>Workspace /</span>
        <h2>{activePage}</h2>
      </div>

      <div className="header-actions">
        <button
          className="header-search"
          onClick={openSearch}
          aria-label="Open global search"
        >
          <Search size={18} />
          <span>Search anything...</span>
          <kbd>⌘ K</kbd>
        </button>

        <div className="header-dropdown-wrapper">
          <button
            className="notification-button"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
              setSearchOpen(false);
            }}
          >
            <Bell size={19} />
            {!notificationsRead && <span className="notification-dot" />}
          </button>

          {notificationsOpen && (
            <div className="header-dropdown notification-dropdown">
              <div className="dropdown-heading">
                <div>
                  <strong>Notifications</strong>
                  <span>Workspace updates</span>
                </div>

                <button
                  className="icon-button"
                  aria-label="Mark notifications as read"
                  title="Mark all as read"
                  onClick={() => setNotificationsRead(true)}
                >
                  <CheckCheck size={17} />
                </button>
              </div>

              <div className="notification-item">
                <span className="notification-icon purple">
                  <Ticket size={17} />
                </span>
                <div>
                  <strong>New support ticket</strong>
                  <p>HD-1042 requires attention.</p>
                  <small>Today</small>
                </div>
              </div>

              <div className="notification-item">
                <span className="notification-icon green">
                  <CheckCheck size={17} />
                </span>
                <div>
                  <strong>Ticket resolved</strong>
                  <p>HD-1040 has been marked resolved.</p>
                  <small>Yesterday</small>
                </div>
              </div>

              <div className="notification-footer">
                Demo notifications
              </div>
            </div>
          )}
        </div>

        <div className="header-dropdown-wrapper">
          <button
            className="header-user"
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
              setSearchOpen(false);
            }}
          >
            <div className="avatar">JD</div>
            <ChevronDown size={15} />
          </button>

          {profileOpen && (
            <div className="header-dropdown profile-dropdown">
              <div className="profile-summary">
                <div className="avatar">JD</div>
                <div>
                  <strong>John Doe</strong>
                  <span>Workspace administrator</span>
                </div>
              </div>

              <div className="dropdown-divider" />

              <button
                className="dropdown-action"
                onClick={() => navigateTo("Customers")}
              >
                <User size={16} />
                Customer accounts
              </button>

              <button
                className="dropdown-action"
                onClick={() => navigateTo("Analytics")}
              >
                <Settings size={16} />
                Workspace overview
              </button>

              <div className="dropdown-divider" />

              <button
                className="dropdown-action"
                onClick={() => {
                  setProfileOpen(false);
                  alert("Demo mode: Sign-out is not connected to an authentication service.");
                }}
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          )}
        </div>

        <button
          className="create-ticket-button"
          onClick={() => navigateTo("Tickets")}
        >
          <Plus size={17} />
          New ticket
        </button>
      </div>

      {searchOpen && (
        <div
          className="search-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSearchOpen(false);
            }
          }}
        >
          <div
            className="global-search-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Global search"
          >
            <div className="global-search-input">
              <Search size={20} />

              <input
                ref={searchRef}
                type="text"
                placeholder="Search workspace pages..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Search workspace pages"
              />

              <button
                className="icon-button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="search-results">
              <span className="search-section-label">
                {searchQuery ? "SEARCH RESULTS" : "QUICK NAVIGATION"}
              </span>

              {filteredPages.length > 0 ? (
                filteredPages.map((page) => {
                  const Icon = page.icon;

                  return (
                    <button
                      className="search-result-item"
                      key={page.name}
                      onClick={() => navigateTo(page.name)}
                    >
                      <span className="search-result-icon">
                        <Icon size={18} />
                      </span>

                      <span>
                        <strong>{page.name}</strong>
                        <small>{page.description}</small>
                      </span>

                      <span className="search-result-enter">↵</span>
                    </button>
                  );
                })
              ) : (
                <div className="search-empty">
                  <Search size={22} />
                  <strong>No pages found</strong>
                  <span>Try another search term.</span>
                </div>
              )}
            </div>

            <div className="search-panel-footer">
              <span><kbd>ESC</kbd> to close</span>
              <span>Workspace search</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
