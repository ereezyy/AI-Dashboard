import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  height: 70px;
  background-color: ${props => props.theme.backgroundSecondary};
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
  z-index: ${props => props.theme.zIndex.sticky};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.textSecondary};
  font-size: ${props => props.theme.fontSize.lg};
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${props => props.theme.text};
  }
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin: 0 0 0 ${props => props.theme.spacing.md};
`;

const SearchBar = styled.div`
  position: relative;
  margin-left: ${props => props.theme.spacing.lg};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  background-color: ${props => props.theme.backgroundTertiary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.text};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  padding-left: 36px;
  font-size: ${props => props.theme.fontSize.sm};
  width: 250px;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    width: 300px;
  }
  
  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.textSecondary};
  font-size: ${props => props.theme.fontSize.md};
`;

const NotificationsButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.textSecondary};
  font-size: ${props => props.theme.fontSize.lg};
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitionSpeed} ease;
  position: relative;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${props => props.theme.text};
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${props => props.theme.error};
  color: white;
  font-size: 10px;
  font-weight: ${props => props.theme.fontWeight.bold};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 1.5s infinite;
`;

const UserButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${props => props.theme.borderRadius.round};
  background-color: ${props => props.theme.accent1};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeight.bold};
  color: white;
  font-size: ${props => props.theme.fontSize.sm};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserName = styled.div`
  font-weight: ${props => props.theme.fontWeight.medium};
  font-size: ${props => props.theme.fontSize.sm};
  color: ${props => props.theme.text};
`;

const UserStatus = styled.div`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.textTertiary};
`;

const NotificationsDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 320px;
  background-color: ${props => props.theme.backgroundSecondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadow};
  z-index: ${props => props.theme.zIndex.dropdown};
  overflow: hidden;
  animation: slideIn 0.2s ease-out;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const NotificationsHeader = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationsTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.md};
  font-weight: ${props => props.theme.fontWeight.medium};
  margin: 0;
`;

const ClearButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.primary};
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NotificationsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  gap: ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => 
    props.type === 'success' ? 'rgba(76, 175, 80, 0.2)' : 
    props.type === 'error' ? 'rgba(244, 67, 54, 0.2)' : 
    props.type === 'warning' ? 'rgba(255, 193, 7, 0.2)' : 
    'rgba(33, 150, 243, 0.2)'};
  color: ${props => 
    props.type === 'success' ? props.theme.success : 
    props.type === 'error' ? props.theme.error : 
    props.type === 'warning' ? props.theme.warning : 
    props.theme.info};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.md};
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.div`
  font-weight: ${props => props.theme.fontWeight.medium};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const NotificationMessage = styled.div`
  font-size: ${props => props.theme.fontSize.sm};
  color: ${props => props.theme.textSecondary};
`;

const NotificationTime = styled.div`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.textTertiary};
  margin-top: ${props => props.theme.spacing.xs};
`;

const EmptyNotifications = styled.div`
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  color: ${props => props.theme.textSecondary};
`;

const Header = ({ toggleSidebar, notifications = [], userProfile }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notificationsRef = useRef(null);
  
  const handleNotificationsToggle = () => {
    setShowNotifications(!showNotifications);
  };
  
  const handleClearNotifications = (e) => {
    e.stopPropagation();
    // In a real app, this would clear notifications
  };
  
  const handleClickOutside = (event) => {
    if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffMs = now - notificationTime;
    const diffMin = Math.floor(diffMs / 60000);
    
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };
  
  const getUserInitials = () => {
    if (!userProfile || !userProfile.name) return 'U';
    
    return userProfile.name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={toggleSidebar}>
          ☰
        </MenuButton>
        <PageTitle>AI Dashboard</PageTitle>
        
        <SearchBar>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
      </LeftSection>
      
      <RightSection>
        <NotificationsButton onClick={handleNotificationsToggle}>
          🔔
          {notifications.length > 0 && (
            <NotificationBadge>{notifications.length}</NotificationBadge>
          )}
        </NotificationsButton>
        
        <UserButton>
          <UserAvatar>{getUserInitials()}</UserAvatar>
          <UserInfo>
            <UserName>{userProfile?.name || 'User'}</UserName>
            <UserStatus>
              {userProfile?.walletConnected ? 'Wallet Connected' : 'Wallet Disconnected'}
            </UserStatus>
          </UserInfo>
        </UserButton>
        
        {showNotifications && (
          <NotificationsDropdown ref={notificationsRef}>
            <NotificationsHeader>
              <NotificationsTitle>Notifications</NotificationsTitle>
              {notifications.length > 0 && (
                <ClearButton onClick={handleClearNotifications}>
                  Clear All
                </ClearButton>
              )}
            </NotificationsHeader>
            
            <NotificationsList>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <NotificationItem key={index}>
                    <NotificationIcon type={notification.type}>
                      {notification.type === 'success' ? '✓' : 
                       notification.type === 'error' ? '✗' : 
                       notification.type === 'warning' ? '⚠' : 'ℹ'}
                    </NotificationIcon>
                    <NotificationContent>
                      <NotificationTitle>{notification.title}</NotificationTitle>
                      <NotificationMessage>{notification.message}</NotificationMessage>
                      <NotificationTime>
                        {formatTimeAgo(notification.timestamp)}
                      </NotificationTime>
                    </NotificationContent>
                  </NotificationItem>
                ))
              ) : (
                <EmptyNotifications>
                  No notifications to display
                </EmptyNotifications>
              )}
            </NotificationsList>
          </NotificationsDropdown>
        )}
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
