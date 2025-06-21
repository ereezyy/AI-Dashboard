const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object to avoid garbage collection
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#121212',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../build/icon.png'),
    show: false, // Don't show until ready-to-show
    frame: true,
    titleBarStyle: 'default'
  });

  // Load the index.html of the app
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  // Show window when ready to avoid flickering
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    // Dereference the window object
    mainWindow = null;
  });
}

// Create window when Electron has finished initialization
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS applications keep their menu bar active until the user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS re-create a window when dock icon is clicked and no other windows are open
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle IPC messages from renderer process
ipcMain.on('app-version', (event) => {
  event.sender.send('app-version', { version: app.getVersion() });
});

// Handle auto-updates (would be implemented in a production app)
ipcMain.on('check-for-updates', (event) => {
  // In a real app, this would check for updates
  event.sender.send('update-status', { status: 'no-update' });
});
