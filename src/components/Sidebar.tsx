
import {
  LayoutDashboard,
  Ticket,
  Users,
  Bot,
  BarChart3,
  Settings,
  LifeBuoy,
  LogOut,
  Headphones,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Tickets", icon: Ticket },
  { name: "Customers", icon: Users },
  { name: "AI Assistant", icon: Bot },
  { name: "Analytics", icon: BarChart3 },
];

export default function Sidebar({
  activePage,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Headphones size={23} />
        </div>
        <div>
          <h2>HelpDesk<span>AI</span></h2>
          <p>SUPPORT PLATFORM</p>
        </div>
      </div>

      <div className="workspace-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => onNavigate(item.name)}
            >
              <Icon size={19} />
              <span>{item.name}</span>
              {item.name === "Tickets" && (
                <span className="nav-count">8</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="workspace-label">PREFERENCES</div>

        <button className="nav-item">
          <Settings size={19} />
          <span>Settings</span>
        </button>

        <button className="nav-item">
          <LifeBuoy size={19} />
          <span>Help & Support</span>
        </button>

        <div className="sidebar-profile">
          <div className="avatar">JD</div>
          <div className="profile-info">
            <strong>John Doe</strong>
            <span>Administrator</span>
          </div>
          <LogOut size={17} className="logout-icon" />
        </div>
      </div>
    </aside>
  );
}
