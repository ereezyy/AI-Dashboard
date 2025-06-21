import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import socialMediaService from './SocialMediaService';

const PlatformConnectContainer = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
`;

const ConnectTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PlatformOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const PlatformOption = styled.div`
  background-color: ${props => props.connected ? 'rgba(138, 43, 226, 0.1)' : props.theme.backgroundSecondary};
  border: 1px solid ${props => props.connected ? props.theme.primary : props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    border-color: ${props => props.theme.primary};
    transform: translateY(-2px);
  }
`;

const PlatformIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.color || props.theme.backgroundTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: white;
`;

const PlatformName = styled.div`
  font-weight: ${props => props.theme.fontWeight.medium};
`;

const PlatformStatus = styled.div`
  font-size: ${props => props.theme.fontSize.sm};
  color: ${props => props.connected ? props.theme.success : props.theme.textSecondary};
`;

const ConnectButton = styled.button`
  background-color: ${props => props.connected ? props.theme.error : props.theme.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  margin-top: ${props => props.theme.spacing.sm};
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.connected ? '#d32f2f' : props.theme.primaryHover};
  }
`;

const StatusMessage = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-top: ${props => props.theme.spacing.md};
  text-align: center;
  background-color: ${props => 
    props.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 
    props.type === 'error' ? 'rgba(244, 67, 54, 0.1)' : 
    'rgba(33, 150, 243, 0.1)'};
  color: ${props => 
    props.type === 'success' ? props.theme.success : 
    props.type === 'error' ? props.theme.error : 
    props.theme.info};
`;

const PlatformConnect = ({ onConnect, onDisconnect }) => {
  const [platforms, setPlatforms] = useState([
    { id: 'facebook', name: 'Facebook', icon: 'f', color: '#1877F2', connected: false },
    { id: 'twitter', name: 'Twitter/X', icon: '𝕏', color: '#000000', connected: false },
    { id: 'tiktok', name: 'TikTok', icon: '♪', color: '#000000', connected: false },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: '#C13584', connected: false },
  ]);
  const [status, setStatus] = useState(null);
  
  useEffect(() => {
    // Check if platforms are already connected
    const updatedPlatforms = platforms.map(platform => ({
      ...platform,
      connected: socialMediaService.isPlatformConnected(platform.id)
    }));
    
    setPlatforms(updatedPlatforms);
  }, []);
  
  const handleToggleConnect = async (platformId) => {
    const platform = platforms.find(p => p.id === platformId);
    
    if (platform.connected) {
      // Disconnect
      const result = await socialMediaService.disconnectPlatform(platformId);
      
      if (result.success) {
        const updatedPlatforms = platforms.map(p => 
          p.id === platformId ? { ...p, connected: false } : p
        );
        
        setPlatforms(updatedPlatforms);
        
        setStatus({
          type: 'success',
          message: `Disconnected from ${platform.name}`
        });
        
        if (onDisconnect) {
          onDisconnect(platformId);
        }
      } else {
        setStatus({
          type: 'error',
          message: result.error || `Failed to disconnect from ${platform.name}`
        });
      }
    } else {
      // Connect
      // In a real app, this would open a popup for OAuth authentication
      // For demo purposes, we'll simulate a successful connection
      
      const result = await socialMediaService.connectPlatform(platformId);
      
      if (result.success) {
        const updatedPlatforms = platforms.map(p => 
          p.id === platformId ? { ...p, connected: true } : p
        );
        
        setPlatforms(updatedPlatforms);
        
        setStatus({
          type: 'success',
          message: `Connected to ${platform.name}`
        });
        
        if (onConnect) {
          onConnect(platformId);
        }
      } else {
        setStatus({
          type: 'error',
          message: result.error || `Failed to connect to ${platform.name}`
        });
      }
    }
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };
  
  return (
    <PlatformConnectContainer>
      <ConnectTitle>Connect Social Media Platforms</ConnectTitle>
      <p>Connect your social media accounts to view and interact with your feeds.</p>
      
      <PlatformOptions>
        {platforms.map(platform => (
          <PlatformOption 
            key={platform.id}
            connected={platform.connected}
          >
            <PlatformIcon color={platform.color}>{platform.icon}</PlatformIcon>
            <PlatformName>{platform.name}</PlatformName>
            <PlatformStatus connected={platform.connected}>
              {platform.connected ? 'Connected' : 'Not Connected'}
            </PlatformStatus>
            <ConnectButton 
              connected={platform.connected}
              onClick={() => handleToggleConnect(platform.id)}
            >
              {platform.connected ? 'Disconnect' : 'Connect'}
            </ConnectButton>
          </PlatformOption>
        ))}
      </PlatformOptions>
      
      {status && (
        <StatusMessage type={status.type}>
          {status.message}
        </StatusMessage>
      )}
    </PlatformConnectContainer>
  );
};

export default PlatformConnect;
