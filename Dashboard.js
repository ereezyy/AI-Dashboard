import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.md};
`;

const Widget = styled.div`
  background-color: ${props => props.theme.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadowLight};
  transition: transform ${props => props.theme.transitionSpeed} ease, 
              box-shadow ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadowMedium};
  }
`;

const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const WidgetTitle = styled.h2`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  color: ${props => props.theme.text};
`;

const WidgetContent = styled.div`
  color: ${props => props.theme.textSecondary};
`;

const WelcomeSection = styled.div`
  background: ${props => props.theme.gradientPrimary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: white;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${props => props.theme.spacing.lg};
`;

const WelcomeText = styled.div`
  h1 {
    font-size: ${props => props.theme.fontSize.xxxl};
    font-weight: ${props => props.theme.fontWeight.bold};
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  p {
    font-size: ${props => props.theme.fontSize.md};
    opacity: 0.9;
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const ActionButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.md};
  font-weight: ${props => props.theme.fontWeight.medium};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const Dashboard = () => {
  return (
    <>
      <WelcomeSection>
        <WelcomeText>
          <h1>Welcome to AI Dashboard</h1>
          <p>Your all-in-one platform for AI chat, crypto trading, casino games, and social media.</p>
          <ActionButton>Get Started</ActionButton>
        </WelcomeText>
      </WelcomeSection>
      
      <DashboardContainer>
        <Widget>
          <WidgetHeader>
            <WidgetTitle>AI Assistant</WidgetTitle>
          </WidgetHeader>
          <WidgetContent>
            <p>Ask me anything or start a conversation with advanced AI.</p>
          </WidgetContent>
        </Widget>
        
        <Widget>
          <WidgetHeader>
            <WidgetTitle>Crypto Wallet</WidgetTitle>
          </WidgetHeader>
          <WidgetContent>
            <p>Manage your Solana tokens and track your portfolio.</p>
          </WidgetContent>
        </Widget>
        
        <Widget>
          <WidgetHeader>
            <WidgetTitle>Casino Games</WidgetTitle>
          </WidgetHeader>
          <WidgetContent>
            <p>Try your luck with slots, poker, and blackjack.</p>
          </WidgetContent>
        </Widget>
        
        <Widget>
          <WidgetHeader>
            <WidgetTitle>Social Media</WidgetTitle>
          </WidgetHeader>
          <WidgetContent>
            <p>Connect and browse your favorite social platforms.</p>
          </WidgetContent>
        </Widget>
        
        <Widget>
          <WidgetHeader>
            <WidgetTitle>Messages</WidgetTitle>
          </WidgetHeader>
          <WidgetContent>
            <p>Chat with friends and contacts in real-time.</p>
          </WidgetContent>
        </Widget>
        
        <Widget>
          <WidgetHeader>
            <WidgetTitle>Recent Activity</WidgetTitle>
          </WidgetHeader>
          <WidgetContent>
            <p>View your recent interactions and transactions.</p>
          </WidgetContent>
        </Widget>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
