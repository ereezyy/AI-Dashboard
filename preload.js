// Preload script for secure context bridge between Electron and React
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron', {
    windowControl: (command) => {
      ipcRenderer.send('window-control', command);
    },
    // Add secure channels for various features
    ai: {
      sendMessage: (message) => ipcRenderer.invoke('ai-send-message', message),
      startVideoChat: () => ipcRenderer.invoke('ai-start-video'),
      processImage: (imageData) => ipcRenderer.invoke('ai-process-image', imageData)
    },
    crypto: {
      getWalletBalance: () => ipcRenderer.invoke('crypto-get-balance'),
      sendTransaction: (details) => ipcRenderer.invoke('crypto-send-transaction', details),
      connectWallet: (provider) => ipcRenderer.invoke('crypto-connect-wallet', provider)
    },
    casino: {
      placeBet: (gameType, betAmount) => ipcRenderer.invoke('casino-place-bet', gameType, betAmount),
      getGameState: (gameId) => ipcRenderer.invoke('casino-get-game-state', gameId),
      cashOut: (gameId) => ipcRenderer.invoke('casino-cash-out', gameId)
    },
    social: {
      fetchFeed: (platform) => ipcRenderer.invoke('social-fetch-feed', platform),
      postContent: (platform, content) => ipcRenderer.invoke('social-post-content', platform, content),
      connectAccount: (platform) => ipcRenderer.invoke('social-connect-account', platform)
    },
    messaging: {
      sendMessage: (recipient, content) => ipcRenderer.invoke('messaging-send', recipient, content),
      getConversations: () => ipcRenderer.invoke('messaging-get-conversations'),
      createGroup: (details) => ipcRenderer.invoke('messaging-create-group', details)
    }
  }
);
