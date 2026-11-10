import { lazy, Suspense, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Customers from "./pages/Customers";
import AIAssistant from "./pages/AIAssistant";

const Analytics = lazy(() => import("./pages/Analytics"));

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Tickets":
        return <Tickets />;

      case "Customers":
        return <Customers />;

      case "AI Assistant":
        return <AIAssistant />;

      case "Analytics":
        return (
          <Suspense
            fallback={
              <div className="page-content">Loading analytics...</div>
            }
          >
            <Analytics />
          </Suspense>
        );

      case "Dashboard":
      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content">
        <Header
          activePage={activePage}
          onNavigate={setActivePage}
        />
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
