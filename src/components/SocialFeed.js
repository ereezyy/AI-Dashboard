import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import socialMediaService from './SocialMediaService';

const FeedContainer = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
`;

const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FeedTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
`;

const RefreshButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  max-height: 600px;
  overflow-y: auto;
`;

const PostCard = styled.div`
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
`;

const PostHeader = styled.div`
  padding: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.round};
  background-color: ${props => props.theme.backgroundTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeight.bold};
  color: ${props => props.theme.textSecondary};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: ${props => props.theme.fontWeight.medium};
`;

const PostTime = styled.div`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.textSecondary};
`;

const PlatformBadge = styled.div`
  background-color: ${props => 
    props.platform === 'facebook' ? '#1877F2' : 
    props.platform === 'twitter' ? '#1DA1F2' : 
    props.platform === 'tiktok' ? '#000000' : 
    props.platform === 'instagram' ? '#C13584' : 
    props.theme.backgroundTertiary};
  color: white;
  font-size: ${props => props.theme.fontSize.xs};
  padding: 2px 6px;
  border-radius: ${props => props.theme.borderRadius.sm};
  margin-left: auto;
`;

const PostContent = styled.div`
  padding: 0 ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
`;

const PostText = styled.p`
  margin-bottom: ${props => props.theme.spacing.md};
  white-space: pre-wrap;
`;

const PostImage = styled.div`
  height: 300px;
  background-color: ${props => props.theme.backgroundTertiary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
`;

const PostActions = styled.div`
  display: flex;
  border-top: 1px solid ${props => props.theme.border};
`;

const ActionButton = styled.button`
  flex: 1;
  background-color: transparent;
  border: none;
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.textSecondary};
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${props => props.theme.text};
  }
`;

const ActionCount = styled.span`
  color: ${props => props.theme.textSecondary};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  color: ${props => props.theme.textSecondary};
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.textSecondary};
`;

const SocialFeed = ({ platform }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchFeed = async () => {
    if (!socialMediaService.isPlatformConnected(platform)) {
      setError(`${platform} is not connected`);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const result = await socialMediaService.fetchFeed(platform);
    
    setLoading(false);
    
    if (result.success) {
      setPosts(result.posts);
    } else {
      setError(result.error || `Failed to fetch ${platform} feed`);
    }
  };
  
  useEffect(() => {
    if (socialMediaService.isPlatformConnected(platform)) {
      fetchFeed();
    }
  }, [platform]);
  
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now - postTime;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return `${diffDay}d ago`;
    } else if (diffHour > 0) {
      return `${diffHour}h ago`;
    } else if (diffMin > 0) {
      return `${diffMin}m ago`;
    } else {
      return 'Just now';
    }
  };
  
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  const getPlatformName = () => {
    switch (platform) {
      case 'facebook': return 'Facebook';
      case 'twitter': return 'Twitter/X';
      case 'tiktok': return 'TikTok';
      case 'instagram': return 'Instagram';
      default: return platform;
    }
  };
  
  const handleLike = (postId) => {
    // In a real app, this would call the platform API to like the post
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };
  
  return (
    <FeedContainer>
      <FeedHeader>
        <FeedTitle>{getPlatformName()} Feed</FeedTitle>
        <RefreshButton onClick={fetchFeed} disabled={loading || !socialMediaService.isPlatformConnected(platform)}>
          Refresh
        </RefreshButton>
      </FeedHeader>
      
      {loading ? (
        <LoadingIndicator>Loading feed...</LoadingIndicator>
      ) : error ? (
        <EmptyState>
          <EmptyIcon>⚠️</EmptyIcon>
          <p>{error}</p>
        </EmptyState>
      ) : posts.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📭</EmptyIcon>
          <p>No posts to display</p>
          {!socialMediaService.isPlatformConnected(platform) && (
            <p>Connect your {getPlatformName()} account to view your feed</p>
          )}
        </EmptyState>
      ) : (
        <PostsList>
          {posts.map(post => (
            <PostCard key={post.id}>
              <PostHeader>
                <UserAvatar>{getInitials(post.user)}</UserAvatar>
                <UserInfo>
                  <UserName>{post.user}</UserName>
                  <PostTime>{formatTimeAgo(post.timestamp)}</PostTime>
                </UserInfo>
                <PlatformBadge platform={platform}>
                  {platform === 'twitter' ? 'X' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                </PlatformBadge>
              </PostHeader>
              
              <PostContent>
                <PostText>{post.content}</PostText>
                {post.hasImage && <PostImage>🖼️</PostImage>}
              </PostContent>
              
              <PostActions>
                <ActionButton onClick={() => handleLike(post.id)}>
                  ❤️ <ActionCount>{post.likes}</ActionCount>
                </ActionButton>
                <ActionButton>
                  💬 <ActionCount>{post.comments}</ActionCount>
                </ActionButton>
                <ActionButton>
                  🔄 <ActionCount>{post.shares}</ActionCount>
                </ActionButton>
              </PostActions>
            </PostCard>
          ))}
        </PostsList>
      )}
    </FeedContainer>
  );
};

export default SocialFeed;
