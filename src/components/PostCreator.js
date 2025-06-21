import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import socialMediaService from './SocialMediaService';

const PostCreatorContainer = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
`;

const PostCreatorTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PlatformSelector = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  overflow-x: auto;
  padding-bottom: ${props => props.theme.spacing.sm};
`;

const PlatformOption = styled.button`
  background-color: ${props => props.selected ? props.color || props.theme.primary : 'transparent'};
  color: ${props => props.selected ? 'white' : props.theme.textSecondary};
  border: 1px solid ${props => props.selected ? props.color || props.theme.primary : props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    border-color: ${props => props.color || props.theme.primary};
    color: ${props => props.selected ? 'white' : props.color || props.theme.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: ${props => props.theme.border};
    color: ${props => props.theme.textSecondary};
  }
`;

const PlatformIcon = styled.span`
  font-size: ${props => props.theme.fontSize.md};
`;

const PostTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  background-color: ${props => props.theme.backgroundSecondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.text};
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.md};
  resize: vertical;
  margin-bottom: ${props => props.theme.spacing.md};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
  
  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MediaActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const MediaButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.textSecondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${props => props.theme.text};
    border-color: ${props => props.theme.text};
  }
`;

const PostButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.md};
  font-weight: ${props => props.theme.fontWeight.medium};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
  
  &:disabled {
    background-color: ${props => props.theme.backgroundTertiary};
    color: ${props => props.theme.textSecondary};
    cursor: not-allowed;
  }
`;

const CharacterCount = styled.div`
  font-size: ${props => props.theme.fontSize.sm};
  color: ${props => props.isNearLimit ? props.theme.warning : props.theme.textSecondary};
  margin-right: ${props => props.theme.spacing.md};
`;

const MediaPreview = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PreviewImage = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  background-color: ${props => props.theme.backgroundTertiary};
  border-radius: ${props => props.theme.borderRadius.sm};
`;

const RemoveMediaButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.round};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.md};
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
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

const PostCreator = ({ onPostCreated }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [hasMedia, setHasMedia] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [status, setStatus] = useState(null);
  
  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: 'f', color: '#1877F2', maxLength: 63206 },
    { id: 'twitter', name: 'Twitter/X', icon: '𝕏', color: '#000000', maxLength: 280 },
    { id: 'tiktok', name: 'TikTok', icon: '♪', color: '#000000', maxLength: 2200 },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: '#C13584', maxLength: 2200 },
  ];
  
  useEffect(() => {
    // Check which platforms are connected
    const connectedPlatformIds = platforms
      .filter(platform => socialMediaService.isPlatformConnected(platform.id))
      .map(platform => platform.id);
    
    if (connectedPlatformIds.length > 0) {
      setSelectedPlatforms([connectedPlatformIds[0]]);
    }
  }, []);
  
  const handlePlatformToggle = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };
  
  const handleAddMedia = () => {
    // In a real app, this would open a file picker
    setHasMedia(true);
  };
  
  const handleRemoveMedia = () => {
    setHasMedia(false);
  };
  
  const handlePost = async () => {
    if (postContent.trim() === '') {
      setStatus({
        type: 'error',
        message: 'Please enter some content for your post'
      });
      return;
    }
    
    if (selectedPlatforms.length === 0) {
      setStatus({
        type: 'error',
        message: 'Please select at least one platform to post to'
      });
      return;
    }
    
    setIsPosting(true);
    setStatus({
      type: 'info',
      message: 'Posting...'
    });
    
    const results = [];
    
    // Post to each selected platform
    for (const platformId of selectedPlatforms) {
      const result = await socialMediaService.createPost(platformId, postContent);
      results.push(result);
    }
    
    setIsPosting(false);
    
    // Check if all posts were successful
    const allSuccessful = results.every(result => result.success);
    
    if (allSuccessful) {
      setStatus({
        type: 'success',
        message: `Posted successfully to ${selectedPlatforms.length} platform(s)`
      });
      setPostContent('');
      setHasMedia(false);
      
      if (onPostCreated) {
        onPostCreated(results);
      }
    } else {
      const failedPlatforms = results
        .filter(result => !result.success)
        .map(result => result.platform)
        .join(', ');
      
      setStatus({
        type: 'error',
        message: `Failed to post to: ${failedPlatforms}`
      });
    }
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };
  
  const getCharacterLimit = () => {
    if (selectedPlatforms.length === 0) return Infinity;
    
    return Math.min(
      ...selectedPlatforms.map(platformId => {
        const platform = platforms.find(p => p.id === platformId);
        return platform ? platform.maxLength : Infinity;
      })
    );
  };
  
  const characterLimit = getCharacterLimit();
  const charactersRemaining = characterLimit - postContent.length;
  const isNearLimit = charactersRemaining <= 20;
  const isOverLimit = charactersRemaining < 0;
  
  return (
    <PostCreatorContainer>
      <PostCreatorTitle>Create Post</PostCreatorTitle>
      
      <PlatformSelector>
        {platforms.map(platform => {
          const isConnected = socialMediaService.isPlatformConnected(platform.id);
          const isSelected = selectedPlatforms.includes(platform.id);
          
          return (
            <PlatformOption
              key={platform.id}
              selected={isSelected}
              color={platform.color}
              onClick={() => handlePlatformToggle(platform.id)}
              disabled={!isConnected}
            >
              <PlatformIcon>{platform.icon}</PlatformIcon>
              {platform.name}
            </PlatformOption>
          );
        })}
      </PlatformSelector>
      
      <PostTextarea
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        maxLength={characterLimit + 10} // Allow a little over to show error state
      />
      
      {hasMedia && (
        <MediaPreview>
          <PreviewImage>🖼️</PreviewImage>
          <RemoveMediaButton onClick={handleRemoveMedia}>×</RemoveMediaButton>
        </MediaPreview>
      )}
      
      <PostActions>
        <MediaActions>
          <MediaButton onClick={handleAddMedia} title="Add Image">
            🖼️
          </MediaButton>
          <MediaButton title="Add GIF">
            GIF
          </MediaButton>
          <MediaButton title="Add Poll">
            📊
          </MediaButton>
        </MediaActions>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {characterLimit < Infinity && (
            <CharacterCount isNearLimit={isNearLimit}>
              {charactersRemaining}
            </CharacterCount>
          )}
          
          <PostButton 
            onClick={handlePost}
            disabled={isPosting || isOverLimit || postContent.trim() === '' || selectedPlatforms.length === 0}
          >
            {isPosting ? 'Posting...' : 'Post'}
          </PostButton>
        </div>
      </PostActions>
      
      {status && (
        <StatusMessage type={status.type}>
          {status.message}
        </StatusMessage>
      )}
    </PostCreatorContainer>
  );
};

export default PostCreator;
