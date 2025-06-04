import React, { useState } from 'react';
import styled from 'styled-components';

const MessagingContainer = styled.div`
  display: flex;
  height: 100%;
`;

const ContactsSidebar = styled.div`
  width: 280px;
  background-color: ${props => props.theme.backgroundSecondary};
  border-right: 1px solid ${props => props.theme.border};
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.border};
`;

const SearchInput = styled.input`
  width: 100%;
  height: 36px;
  background-color: ${props => props.theme.backgroundTertiary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.text};
  padding: 0 ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.sm};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
  
  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }
`;

const ContactsList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.border};
  cursor: pointer;
  background-color: ${props => props.active ? 'rgba(138, 43, 226, 0.1)' : 'transparent'};
  
  &:hover {
    background-color: ${props => props.active ? 'rgba(138, 43, 226, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.round};
  background-color: ${props => props.theme.backgroundTertiary};
  position: relative;
`;

const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.online ? props.theme.success : props.theme.textDisabled};
  border: 2px solid ${props => props.theme.backgroundSecondary};
  position: absolute;
  bottom: 0;
  right: 0;
`;

const ContactInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

const ContactName = styled.div`
  font-weight: ${props => props.theme.fontWeight.medium};
  margin-bottom: 2px;
`;

const LastMessage = styled.div`
  font-size: ${props => props.theme.fontSize.sm};
  color: ${props => props.theme.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContactTime = styled.div`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.textSecondary};
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  height: 60px;
  padding: 0 ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ChatName = styled.h2`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
`;

const ChatActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.textSecondary};
  font-size: ${props => props.theme.fontSize.lg};
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.md};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${props => props.theme.text};
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  gap: ${props => props.theme.spacing.sm};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  background-color: ${props => props.isUser ? props.theme.primary : props.theme.backgroundSecondary};
  color: ${props => props.isUser ? 'white' : props.theme.text};
`;

const MessageTime = styled.div`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.theme.textSecondary};
`;

const InputArea = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.border};
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const MessageInput = styled.input`
  flex: 1;
  height: 40px;
  background-color: ${props => props.theme.backgroundTertiary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.text};
  padding: 0 ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.md};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const SendButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.md};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`;

const EmptyState = styled.div`
  flex: 1;
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
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const EmptyTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.text};
`;

const EmptyDescription = styled.p`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Messaging = () => {
  const [activeContact, setActiveContact] = useState(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState({});
  
  const contacts = [
    { id: 1, name: 'Alice Johnson', online: true, lastMessage: 'Hey, how are you?', time: '10:30 AM' },
    { id: 2, name: 'Bob Smith', online: false, lastMessage: 'Did you see the latest crypto news?', time: 'Yesterday' },
    { id: 3, name: 'Charlie Brown', online: true, lastMessage: 'Let\'s play poker tonight!', time: 'Yesterday' },
    { id: 4, name: 'Diana Prince', online: true, lastMessage: 'Check out this new AI feature', time: 'Monday' },
    { id: 5, name: 'Ethan Hunt', online: false, lastMessage: 'Mission accomplished', time: 'Sunday' },
  ];
  
  const handleSendMessage = () => {
    if (inputText.trim() === '' || !activeContact) return;
    
    const newMessages = { ...messages };
    if (!newMessages[activeContact]) {
      newMessages[activeContact] = [];
    }
    
    newMessages[activeContact].push({
      id: newMessages[activeContact].length + 1,
      text: inputText,
      isUser: true,
      time: 'Just now'
    });
    
    setMessages(newMessages);
    setInputText('');
    
    // Simulate reply
    setTimeout(() => {
      const replyMessages = { ...newMessages };
      replyMessages[activeContact].push({
        id: replyMessages[activeContact].length + 1,
        text: 'This is a placeholder reply. In the full implementation, this would be connected to a real messaging system.',
        isUser: false,
        time: 'Just now'
      });
      
      setMessages(replyMessages);
    }, 1000);
  };
  
  return (
    <MessagingContainer>
      <ContactsSidebar>
        <SearchContainer>
          <SearchInput placeholder="Search contacts..." />
        </SearchContainer>
        
        <ContactsList>
          {contacts.map(contact => (
            <ContactItem 
              key={contact.id}
              active={activeContact === contact.id}
              onClick={() => setActiveContact(contact.id)}
            >
              <Avatar>
                <StatusIndicator online={contact.online} />
              </Avatar>
              <ContactInfo>
                <ContactName>{contact.name}</ContactName>
                <LastMessage>{contact.lastMessage}</LastMessage>
              </ContactInfo>
              <ContactTime>{contact.time}</ContactTime>
            </ContactItem>
          ))}
        </ContactsList>
      </ContactsSidebar>
      
      {activeContact ? (
        <ChatArea>
          <ChatHeader>
            <ChatInfo>
              <Avatar>
                <StatusIndicator online={contacts.find(c => c.id === activeContact)?.online} />
              </Avatar>
              <ChatName>{contacts.find(c => c.id === activeContact)?.name}</ChatName>
            </ChatInfo>
            
            <ChatActions>
              <ActionButton>📞</ActionButton>
              <ActionButton>📹</ActionButton>
              <ActionButton>⋮</ActionButton>
            </ChatActions>
          </ChatHeader>
          
          <MessagesContainer>
            {messages[activeContact]?.map(message => (
              <MessageGroup key={message.id} isUser={message.isUser}>
                <MessageBubble isUser={message.isUser}>
                  {message.text}
                </MessageBubble>
                <MessageTime>{message.time}</MessageTime>
              </MessageGroup>
            ))}
          </MessagesContainer>
          
          <InputArea>
            <MessageInput 
              placeholder="Type a message..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <SendButton onClick={handleSendMessage}>➤</SendButton>
          </InputArea>
        </ChatArea>
      ) : (
        <EmptyState>
          <EmptyIcon>💬</EmptyIcon>
          <EmptyTitle>Select a conversation</EmptyTitle>
          <EmptyDescription>
            Choose a contact from the list to start messaging
          </EmptyDescription>
        </EmptyState>
      )}
    </MessagingContainer>
  );
};

export default Messaging;
