import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlatformConnect from '../social/PlatformConnect';
import SocialFeed from '../social/SocialFeed';
import PostCreator from '../social/PostCreator';
import socialMediaService from '../social/SocialMediaService';

const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const SocialPageTitle = styled.h2`
  font-size: ${props => props.theme.fontSize.xl};
  font-weight: ${props => props.theme.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FeedSelector = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  overflow-x: auto;
  padding-bottom: ${props => props.theme.spacing.sm};
`;

const FeedButton = styled.button`
  background-color: ${props => props.active ? props.color || props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.textSecondary};
  border: 1px solid ${props => props.active ? props.color || props.theme.primary : props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.md};
  font-weight: ${props => props.theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    border-color: ${props => props.color || props.theme.primary};
    color: ${props => props.active ? 'white' : props.color || props.theme.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: ${props => props.theme.border};
    color: ${props => props.theme.textSecondary};
  }
`;

const FeedIcon = styled.span`
  font-size: ${props => props.theme.fontSize.md};
`;

const SocialMediaPage = () => {
  const [activeFeed, setActiveFeed] = useState('facebook');
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  
  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: 'f', color: '#1877F2' },
    { id: 'twitter', name: 'Twitter/X', icon: '𝕏', color: '#000000' },
    { id: 'tiktok', name: 'TikTok', icon: '♪', color: '#000000' },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: '#C13584' },
  ];
  
  useEffect(() => {
    // Check which platforms are connected
    const connected = platforms
      .filter(platform => socialMediaService.isPlatformConnected(platform.id))
      .map(platform => platform.id);
    
    setConnectedPlatforms(connected);
    
    // Set active feed to first connected platform, if any
    if (connected.length > 0 && !connected.includes(activeFeed)) {
      setActiveFeed(connected[0]);
    }
  }, []);
  
  const handlePlatformConnect = (platformId) => {
    setConnectedPlatforms([...connectedPlatforms, platformId]);
    
    // If no active feed is selected, set this one as active
    if (!activeFeed || !connectedPlatforms.includes(activeFeed)) {
      setActiveFeed(platformId);
    }
  };
  
  const handlePlatformDisconnect = (platformId) => {
    setConnectedPlatforms(connectedPlatforms.filter(id => id !== platformId));
    
    // If active feed is disconnected, switch to another connected platform
    if (activeFeed === platformId) {
      const remaining = connectedPlatforms.filter(id => id !== platformId);
      if (remaining.length > 0) {
        setActiveFeed(remaining[0]);
      } else {
        setActiveFeed(null);
      }
    }
  };
  
  const handlePostCreated = (results) => {
    // Refresh the active feed
    // In a real app, this would update the feed with the new post
  };
  
  return (
    <SocialMediaContainer>
      <SocialPageTitle>Social Media</SocialPageTitle>
      
      <PlatformConnect 
        onConnect={handlePlatformConnect}
        onDisconnect={handlePlatformDisconnect}
      />
      
      {connectedPlatforms.length > 0 && (
        <>
          <PostCreator onPostCreated={handlePostCreated} />
          
          <FeedSelector>
            {platforms.map(platform => {
              const isConnected = connectedPlatforms.includes(platform.id);
              
              return (
                <FeedButton
                  key={platform.id}
                  active={activeFeed === platform.id}
                  color={platform.color}
                  onClick={() => setActiveFeed(platform.id)}
                  disabled={!isConnected}
                >
                  <FeedIcon>{platform.icon}</FeedIcon>
                  {platform.name} Feed
                </FeedButton>
              );
            })}
          </FeedSelector>
          
          {activeFeed && <SocialFeed platform={activeFeed} />}
        </>
      )}
    </SocialMediaContainer>
  );
};

export default SocialMediaPage;
