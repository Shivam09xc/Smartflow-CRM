
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Deals from './pages/Deals';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Contacts from './pages/Contacts';
import Accounts from './pages/Accounts';
import ContactDetails from './pages/ContactDetails';
import Login from './pages/Login';
import Users from './pages/Users';
import AssociateDashboard from './pages/AssociateDashboard';
import RegionalReports from './pages/RegionalReports';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    if (selectedLeadId) {
      return <ContactDetails leadId={selectedLeadId} onBack={() => setSelectedLeadId(null)} />;
    }

    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'leads': return <Leads onSelectLead={setSelectedLeadId} />;
      case 'contacts': return <Contacts onSelectContact={setSelectedLeadId} />;
      case 'accounts': return <Accounts />;
      case 'deals': return <Deals />;
      case 'tasks': return <Tasks />;
      case 'analytics': return <Analytics />;
      case 'settings': return <Settings />;
      case 'users': return <Users />;
      case 'associate-dashboard': return <AssociateDashboard />;
      case 'regional-reports': return <RegionalReports />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <Sidebar activePage={currentPage} onNavigate={(p) => { setCurrentPage(p); setSelectedLeadId(null); }} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onLogout={() => setIsAuthenticated(false)} />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
