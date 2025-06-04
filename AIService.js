// AI Service for handling AI chat functionality
import axios from 'axios';

class AIService {
  constructor() {
    this.apiKey = null;
    this.baseUrl = 'https://api.openai.com/v1';
    this.model = 'gpt-4-turbo';
    this.maxTokens = 1000;
  }

  setApiKey(key) {
    this.apiKey = key;
    localStorage.setItem('ai_api_key', key);
  }

  getApiKey() {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('ai_api_key');
    }
    return this.apiKey;
  }

  async sendMessage(message, conversation = []) {
    if (!this.getApiKey()) {
      return {
        error: 'API key not set. Please configure your API key in settings.'
      };
    }

    try {
      // Format conversation history for the API
      const messages = [
        { role: 'system', content: 'You are a helpful AI assistant integrated into a dashboard application with crypto, casino, and social media features.' },
        ...conversation.map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: 'user', content: message }
      ];

      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          messages,
          max_tokens: this.maxTokens,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getApiKey()}`
          }
        }
      );

      return {
        text: response.data.choices[0].message.content,
        isUser: false
      };
    } catch (error) {
      console.error('Error calling AI API:', error);
      
      // Return a fallback response for the demo
      return {
        text: "I'm having trouble connecting to my backend services. This is a simulated response for demonstration purposes. In the full implementation, this would connect to the OpenAI API.",
        isUser: false
      };
    }
  }

  async processImage(imageData, prompt) {
    if (!this.getApiKey()) {
      return {
        error: 'API key not set. Please configure your API key in settings.'
      };
    }

    try {
      // This would be implemented to call the OpenAI Vision API
      // For the demo, we'll return a simulated response
      
      return {
        text: "I've analyzed the image you sent. This is a simulated response for demonstration purposes. In the full implementation, this would use the OpenAI Vision API to analyze the image content.",
        isUser: false
      };
    } catch (error) {
      console.error('Error processing image:', error);
      return {
        text: "I'm having trouble analyzing this image. Please try again later.",
        isUser: false
      };
    }
  }

  // Simulated method for voice-to-text
  async transcribeAudio(audioBlob) {
    // This would be implemented to call the OpenAI Whisper API
    // For the demo, we'll return a simulated response
    
    return {
      text: "This is simulated voice transcription. In the full implementation, this would use the OpenAI Whisper API to convert speech to text."
    };
  }
}

// Create a singleton instance
const aiService = new AIService();
export default aiService;
