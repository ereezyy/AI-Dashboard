import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative; /* For positioning drag-over overlay if needed */
  border: ${props => props.isDragging ? `2px dashed ${props.theme.primary}` : 'none'};
  background-color: ${props => props.isDragging ? 'rgba(138, 43, 226, 0.1)' : 'transparent'};
`;

const ChatHeader = styled.div`
  background-color: ${props => props.theme.backgroundSecondary};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h2`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: ${props => props.theme.fontWeight.semiBold};
`;

const ChatOptions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const OptionButton = styled.button`
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.textSecondary};
  border: 1px solid ${props => props.active ? props.theme.primary : props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.primaryHover : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  overflow-y: auto;
  background-color: ${props => props.theme.backgroundTertiary};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Message = styled.div`
  max-width: 70%;
  background-color: ${props => props.isError ? props.theme.dangerBackground : (props.isUser ? props.theme.primary : props.theme.backgroundSecondary)};
  color: ${props => props.isError ? props.theme.dangerColor : (props.isUser ? 'white' : props.theme.text)};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  box-shadow: ${props => props.theme.shadowLight};
  animation: ${props => props.isUser ? 'slideInRight' : 'slideInLeft'} 0.3s ease;
  
  @keyframes slideInRight {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideInLeft {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

const MessageText = styled.div`
  line-height: 1.5;
`;

const MessageImage = styled.img`
  max-width: 100%;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const MessageTime = styled.div`
  font-size: ${props => props.theme.fontSize.xs};
  color: ${props => props.isUser ? 'rgba(255, 255, 255, 0.7)' : props.theme.textSecondary};
  margin-top: ${props => props.theme.spacing.sm};
  text-align: right;
`;

const InputArea = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: 0 0 ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg};
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const ChatInput = styled.textarea`
  flex: 1;
  background-color: ${props => props.theme.backgroundTertiary};
  border: 1px solid ${props => props.theme.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.text};
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSize.md};
  resize: none;
  min-height: 40px;
  max-height: 120px;
  font-family: inherit;
  
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
  padding: 0 ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSize.md};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`;

const MediaButtons = styled.div`
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
  font-size: ${props => props.theme.fontSize.lg};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${props => props.theme.text};
  }
`;

const VideoContainer = styled.div`
  display: ${props => props.active ? 'flex' : 'none'};
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.backgroundTertiary};
  flex: 1;
`;

const VideoScreen = styled.div`
  flex: 1;
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const MainVideo = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
`;

const SelfVideo = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  width: 150px;
  height: 100px;
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${props => props.theme.primary};
`;

const VideoControls = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
`;

const VideoButton = styled.button`
  background-color: ${props => props.danger ? '#e74c3c' : props.theme.backgroundSecondary};
  color: ${props => props.danger ? 'white' : props.theme.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.round};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSize.lg};
  cursor: pointer;
  transition: all ${props => props.theme.transitionSpeed} ease;
  
  &:hover {
    background-color: ${props => props.danger ? '#c0392b' : props.theme.backgroundTertiary};
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ListeningIndicatorText = styled.div`
  color: ${props => props.theme.primary};
  font-size: ${props => props.theme.fontSize.sm};
  margin-left: ${props => props.theme.spacing.md};
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.textSecondary};
  font-size: ${props => props.theme.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  .dot {
    width: 8px;
    height: 8px;
    background-color: ${props => props.theme.textSecondary};
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
    display: inline-block;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
  
  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
  }
`;

const AIChat = () => {
  const [chatMode, setChatMode] = useState('text');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false, time: formatTime(new Date()) },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const newMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      time: formatTime(new Date())
    };
    
    setMessages(prev => [...prev, newMessage]);
    const currentInputText = inputText; // Capture current input before clearing
    setInputText('');
    setIsTyping(true);

    // Prepare messages for the API, including history and the new user message
    const apiMessages = messages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
      // Include other message properties if your API supports/requires them (e.g., name, image_url for vision models)
    }));
    apiMessages.push({ role: 'user', content: currentInputText });

    try {
      const aiApiUrl = process.env.REACT_APP_AI_API_URL;
      const aiApiKey = process.env.REACT_APP_AI_API_KEY;

      if (!aiApiUrl || !aiApiKey) {
        console.error("AI API URL or Key is not configured. REACT_APP_AI_API_URL:", aiApiUrl, "REACT_APP_AI_API_KEY provided:", !!aiApiKey);
        throw new Error("AI Service is not configured. Please check your .env file and ensure it's loaded correctly (e.g., restart development server after creating .env).");
      }

      // IMPORTANT: Adjust the endpoint, headers, and body structure below
      // to match your specific AI service's documentation.
      // This example assumes an OpenAI-like chat completions API structure.
      const response = await fetch(aiApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Common authorization header, adjust if your API uses a different method (e.g., 'X-API-Key': aiApiKey)
          'Authorization': `Bearer ${aiApiKey}` 
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // **Specify the model for OpenRouter**
          messages: apiMessages, // Sending the conversation history including the latest user message.
          // --- Optional parameters (examples, check OpenRouter/model-specific docs) ---
          // max_tokens: 150,       // Controls the maximum length of the response.
          // temperature: 0.7,      // Controls randomness/creativity. Higher is more random.
          // stream: false,         // Set to true if you want to handle streaming responses (more complex UI handling).
        })
      });

      if (!response.ok) {
        let errorData = { message: `Request failed with status: ${response.status}` };
        try {
          // Try to parse the error response body for more details
          const parsedError = await response.json();
          // OpenAI often puts detailed errors in parsedError.error.message
          errorData.message = parsedError?.error?.message || parsedError?.message || errorData.message;
        } catch (e) {
          // If parsing fails, use the status text or the generic message
          errorData.message = response.statusText || errorData.message;
        }
        
        // Specific handling for 429 (Rate Limit) as per user rules
        if (response.status === 429) {
            throw new Error(`AI Rate limit exceeded. Please try again later. (${response.status}: ${errorData.message})`);
        }
        throw new Error(`AI API Error: ${errorData.message} (${response.status})`);
      }

      const data = await response.json();
      
      // IMPORTANT: Extract the AI's response text. This structure is common (e.g., OpenAI).
      // Adjust this part based on your AI service's actual response format.
      let aiText = "Sorry, I received an unexpected response format from the AI.";
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        aiText = data.choices[0].message.content.trim();
      } else if (data.text) { // Fallback for some older/simpler APIs
        aiText = data.text.trim();
      } else if (data.message && typeof data.message === 'string') { // Another possible fallback for simple text responses
        aiText = data.message.trim();
      } else if (Array.isArray(data) && data.length > 0 && data[0].generated_text) { // E.g., Hugging Face Inference API
        aiText = data[0].generated_text.trim();
      } else if (typeof data === 'string') { // If the API returns a plain string response
        aiText = data.trim();
      }
      // Add more conditions here if your API has a different structure for the response text.

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: aiText,
          isUser: false,
          time: formatTime(new Date())
        }
      ]);

    } catch (error) {
      console.error("Error in handleSendMessage during AI API call:", error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: `⚠️ AI Error: ${error.message || 'Could not connect to AI service.'}`,
          isUser: false,
          time: formatTime(new Date()),
          isError: true
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleToggleListening = () => {
    setIsListening(prev => !prev);
    // TODO: Add speech recognition start/stop logic here
    if (!isListening) {
      console.log("Voice input started (simulated)");
      // Example: navigator.mediaDevices.getUserMedia({ audio: true }) then use Web Speech API
    } else {
      console.log("Voice input stopped (simulated)");
    }
  };

  const processAndUploadFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      // Optionally, show an error message to the user if the file is not an image
      console.warn("Attempted to upload a non-image file:", file ? file.type : 'no file');
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: "Upload failed: Only image files are supported.",
          isUser: false, // Or a system message type
          time: formatTime(new Date()),
          isError: true // Custom flag for styling error messages
        }
      ]);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newMessage = {
        id: Date.now(),
        text: "I've shared an image with you:",
        image: event.target.result,
        isUser: true,
        time: formatTime(new Date())
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(true);

      // Simulate AI response to image
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            text: "I've received your image. In the full implementation, I would analyze this image and provide relevant insights or responses.",
            isUser: false,
            time: formatTime(new Date())
          }
        ]);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      processAndUploadFile(file);
    }
    // Reset file input value to allow uploading the same file again if needed
    if (e.target) {
      e.target.value = null;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Process the first dropped file. Can be extended to handle multiple files.
      const file = e.dataTransfer.files[0];
      processAndUploadFile(file);
      e.dataTransfer.clearData();
    }
  };
  
  return (
    <ChatContainer 
      onDragOver={handleDragOver} 
      onDragLeave={handleDragLeave} 
      onDrop={handleDrop}
      isDragging={isDragging} // Pass isDragging to styled component for visual feedback
    >
      <ChatHeader>
        <ChatTitle>AI Assistant</ChatTitle>
        <ChatOptions>
          <OptionButton 
            active={chatMode === 'text'} 
            onClick={() => setChatMode('text')}
          >
            Text
          </OptionButton>
          <OptionButton 
            active={chatMode === 'image'} 
            onClick={() => setChatMode('image')}
          >
            Image
          </OptionButton>
          <OptionButton 
            active={chatMode === 'video'} 
            onClick={() => setChatMode('video')}
          >
            Video
          </OptionButton>
        </ChatOptions>
      </ChatHeader>
      
      {chatMode !== 'video' ? (
        <>
          <MessagesContainer>
            {messages.map(message => (
              <Message key={message.id} isUser={message.isUser}>
                <MessageText>{message.text}</MessageText>
                {message.image && <MessageImage src={message.image} alt="Shared image" />}
                <MessageTime isUser={message.isUser}>{message.time}</MessageTime>
              </Message>
            ))}
            
            {isTyping && (
              <TypingIndicator>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </TypingIndicator>
            )}
            
            <div ref={messagesEndRef} />
          </MessagesContainer>
          
          <InputArea>
            <MediaButtons>
              <MediaButton onClick={() => fileInputRef.current.click()}>
                📷
                <ImageUploadInput 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </MediaButton>
              <MediaButton onClick={handleToggleListening} title={isListening ? "Stop listening" : "Start voice input"} style={{ backgroundColor: isListening ? props.theme.primary : 'transparent', color: isListening ? 'white' : props.theme.textSecondary }}>🎤</MediaButton>
              <MediaButton title="Generate Image with AI">🖼️</MediaButton> {/* Placeholder for AI Image Generation */}
              <MediaButton>📎</MediaButton>
            </MediaButtons>
            
            <ChatInput 
              placeholder={isListening ? "Listening... Speak now." : "Type your message..."} 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              disabled={isListening} // Optionally disable text input while listening
            />
            {isListening && <ListeningIndicatorText>Listening...</ListeningIndicatorText>}
            <SendButton onClick={handleSendMessage} disabled={isListening}>Send</SendButton>
          </InputArea>
        </>
      ) : (
        <VideoContainer active={chatMode === 'video'}>
          <VideoScreen>
            <MainVideo>AI Video Chat</MainVideo>
            <SelfVideo>You</SelfVideo>
          </VideoScreen>
          
          <VideoControls>
            <VideoButton>🎤</VideoButton>
            <VideoButton>📹</VideoButton>
            <VideoButton>💻</VideoButton>
            <VideoButton danger>📞</VideoButton>
          </VideoControls>
        </VideoContainer>
      )}
    </ChatContainer>
  );
};

export default AIChat;
