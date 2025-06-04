import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './assets/styles/GlobalStyles';
import { darkTheme } from './assets/styles/themes';

// Layout components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page components
import Dashboard from './components/pages/Dashboard';
import AIChat from './components/pages/AIChat';
import CryptoWallet from './components/pages/CryptoWallet';
import Casino from './components/pages/Casino';
import SocialMedia from './components/pages/SocialMedia';
import Messaging from './components/pages/Messaging';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.lg};
`;

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: 'Demo User',
    avatar: null,
    walletConnected: false,
    aiApiConfigured: false
  });

  // Add a notification
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Render the active page
  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard addNotification={addNotification} />;
      case 'ai-chat':
        return <AIChat />;
      case 'crypto-wallet':
        return <CryptoWallet setUserProfile={setUserProfile} />;
      case 'casino':
        return <Casino />;
      case 'social-media':
        return <SocialMedia />;
      case 'messaging':
        return <Messaging />;
      default:
        return <Dashboard addNotification={addNotification} />;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <AppContainer>
        <Sidebar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          collapsed={sidebarCollapsed}
          userProfile={userProfile}
        />
        <MainContent>
          <Header 
            toggleSidebar={toggleSidebar} 
            notifications={notifications}
            userProfile={userProfile}
          />
          <ContentArea>
            {renderActivePage()}
          </ContentArea>
          <Footer />
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
