import React from 'react';
import styled from 'styled-components';

// AI Chat components
const AIComponentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ComponentCard = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
`;

const ComponentTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.text};
`;

const ComponentDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.5;
`;

const ApiKeySection = styled.div`
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ApiKeyInput = styled.input`
  width: 100%;
  background-color: ${props => props.theme.backgroundTertiary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.text};
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.md};
  margin-top: ${props => props.theme.spacing.sm};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const SaveButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.md};
  cursor: pointer;
  margin-top: ${props => props.theme.spacing.md};
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`;

const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  
  input {
    height: 0;
    width: 0;
    visibility: hidden;
    position: absolute;
  }
  
  label {
    cursor: pointer;
    width: 50px;
    height: 25px;
    background: ${props => props.theme.backgroundTertiary};
    display: block;
    border-radius: 25px;
    position: relative;
    margin-right: ${props => props.theme.spacing.md};
  }
  
  label:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 19px;
    height: 19px;
    background: ${props => props.theme.textSecondary};
    border-radius: 19px;
    transition: 0.3s;
  }
  
  input:checked + label {
    background: ${props => props.theme.primary};
  }
  
  input:checked + label:after {
    left: calc(100% - 3px);
    transform: translateX(-100%);
    background: white;
  }
`;

const ToggleLabel = styled.span`
  color: ${props => props.theme.text};
  font-size: ${props => props.theme.fontSize.md};
`;

const AISettings = () => {
  return (
    <AIComponentsContainer>
      <ComponentCard>
        <ComponentTitle>AI Chat Configuration</ComponentTitle>
        <ComponentDescription>
          Configure your AI assistant settings and API connections. These settings will affect how the AI responds to your queries and processes images and video.
        </ComponentDescription>
        
        <ApiKeySection>
          <label htmlFor="openai-api-key">OpenAI API Key</label>
          <ApiKeyInput 
            id="openai-api-key"
            type="password" 
            placeholder="Enter your OpenAI API key" 
          />
          <p style={{ fontSize: '12px', marginTop: '5px', color: '#999' }}>
            Your API key is stored locally and never shared with third parties.
          </p>
        </ApiKeySection>
        
        <ToggleSwitch>
          <input type="checkbox" id="memory-toggle" />
          <label htmlFor="memory-toggle"></label>
          <ToggleLabel>Enable conversation memory</ToggleLabel>
        </ToggleSwitch>
        
        <ToggleSwitch>
          <input type="checkbox" id="image-toggle" checked />
          <label htmlFor="image-toggle"></label>
          <ToggleLabel>Enable image processing</ToggleLabel>
        </ToggleSwitch>
        
        <ToggleSwitch>
          <input type="checkbox" id="video-toggle" checked />
          <label htmlFor="video-toggle"></label>
          <ToggleLabel>Enable video chat</ToggleLabel>
        </ToggleSwitch>
        
        <SaveButton>Save Settings</SaveButton>
      </ComponentCard>
      
      <ComponentCard>
        <ComponentTitle>Voice Settings</ComponentTitle>
        <ComponentDescription>
          Configure voice recognition and text-to-speech settings for your AI assistant.
        </ComponentDescription>
        
        <ToggleSwitch>
          <input type="checkbox" id="voice-toggle" checked />
          <label htmlFor="voice-toggle"></label>
          <ToggleLabel>Enable voice recognition</ToggleLabel>
        </ToggleSwitch>
        
        <ToggleSwitch>
          <input type="checkbox" id="tts-toggle" checked />
          <label htmlFor="tts-toggle"></label>
          <ToggleLabel>Enable text-to-speech</ToggleLabel>
        </ToggleSwitch>
        
        <SaveButton>Save Voice Settings</SaveButton>
      </ComponentCard>
    </AIComponentsContainer>
  );
};

export default AISettings;
