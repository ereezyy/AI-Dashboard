import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Enhanced Sidebar component with improved styling and animations
const SidebarContainer = styled.div`
  width: ${props => props.collapsed ? '80px' : '250px'};
  height: 100vh;
  background-color: ${props => props.theme.backgroundSecondary};
  border-right: 1px solid ${props => props.theme.border};
  transition: width ${props => props.theme.transitionSpeedSlow} ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadowLight};
  z-index: ${props => props.theme.zIndex.sticky};
`;

const SidebarHeader = styled.div`
  padding: ${props => props.collapsed ? 
    `${props.theme.spacing.md} ${props.theme.spacing.sm}` : 
    `${props.theme.spacing.md} ${props.theme.spacing.lg}`};
  display: flex;
  align-items: center;
  justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};
  border-bottom: 1px solid ${props => props.theme.border};
  height: 70px;
`;

const Logo = styled.div`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.bold};
  color: ${props => props.theme.primary};
  display: flex;
  align-items: center;
  
  span {
    margin-left: ${props => props.theme.spacing.sm};
    opacity: ${props => props.collapsed ? 0 : 1};
    transition: opacity ${props => props.theme.transitionSpeed} ease;
    white-space: nowrap;
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.gradientPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeight.bold};
  color: white;
  font-size: ${props => props.collapsed ? props.theme.fontSize.md : props.theme.fontSize.sm};
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.md} 0;
  flex: 1;
  overflow-y: auto;
`;

const NavItem = styled.div`
  padding: ${props => props.collapsed ? 
    `${props.theme.spacing.md} 0` : 
    `${props.theme.spacing.md} ${props.theme.spacing.lg}`};
  display: flex;
  align-items: center;
  justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};
  cursor: pointer;
  color: ${props => props.active ? props.theme.primary : props.theme.textSecondary};
  font-weight: ${props => props.active ? props.theme.fontWeight.medium : props.theme.fontWeight.regular};
  transition: all ${props => props.theme.transitionSpeed} ease;
  position: relative;
  
  &:hover {
    color: ${props => props.theme.primary};
    background-color: rgba(110, 69, 226, 0.05);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${props => props.active ? props.theme.primary : 'transparent'};
    transition: background-color ${props => props.theme.transitionSpeed} ease;
  }
`;

const NavIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.md};
`;

const NavText = styled.div`
  margin-left: ${props => props.theme.spacing.md};
  opacity: ${props => props.collapsed ? 0 : 1};
  transition: opacity ${props => props.theme.transitionSpeed} ease;
  white-space: nowrap;
`;

const UserSection = styled.div`
  padding: ${props => props.collapsed ? 
    `${props.theme.spacing.md} ${props.theme.spacing.sm}` : 
    `${props.theme.spacing.md} ${props.theme.spacing.lg}`};
  display: flex;
  align-items: center;
  justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};
  border-top: 1px solid ${props => props.theme.border};
  background-color: ${props => props.theme.backgroundTertiary};
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
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
  margin-left: ${props => props.theme.spacing.md};
  opacity: ${props => props.collapsed ? 0 : 1};
  transition: opacity ${props => props.theme.transitionSpeed} ease;
  white-space: nowrap;
  overflow: hidden;
`;

const UserName = styled.div`
  font-weight: ${props => props.theme.fontWeight.medium};
  font-size: ${props => props.theme.fontSize.sm};
`;

const UserStatus = styled.div`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.textTertiary};
`;

const Sidebar = ({ activePage, setActivePage, collapsed, userProfile }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'ai-chat', icon: '🤖', label: 'AI Chat' },
    { id: 'crypto-wallet', icon: '💰', label: 'Crypto Wallet' },
    { id: 'casino', icon: '🎰', label: 'Casino' },
    { id: 'social-media', icon: '📱', label: 'Social Media' },
    { id: 'messaging', icon: '💬', label: 'Messaging' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];
  
  const handleNavClick = (itemId) => {
    setActivePage(itemId);
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
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader collapsed={collapsed}>
        <Logo collapsed={collapsed}>
          <LogoIcon collapsed={collapsed}>AI</LogoIcon>
          <span>AI Dashboard</span>
        </Logo>
      </SidebarHeader>
      
      <NavItems>
        {navItems.map(item => (
          <NavItem 
            key={item.id}
            active={activePage === item.id}
            collapsed={collapsed}
            onClick={() => handleNavClick(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavIcon>{item.icon}</NavIcon>
            <NavText collapsed={collapsed}>{item.label}</NavText>
          </NavItem>
        ))}
      </NavItems>
      
      <UserSection collapsed={collapsed}>
        <UserAvatar>{getUserInitials()}</UserAvatar>
        <UserInfo collapsed={collapsed}>
          <UserName>{userProfile?.name || 'User'}</UserName>
          <UserStatus>
            {userProfile?.walletConnected ? 'Wallet Connected' : 'Wallet Disconnected'}
          </UserStatus>
        </UserInfo>
      </UserSection>
    </SidebarContainer>
  );
};

export default Sidebar;
