const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  // Create the main browser window
  mainWindow = new BrowserWindow({
    width: 800, // Set your window width
    height: 600, // Set your window height
    title: "Carbona Text Editor",
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true, // Enable Node.js integration in the renderer process (be cautious with this option)
    },
  });

  // Load your HTML file (replace 'index.html' with your actual file)
  mainWindow.loadFile('index.html');

  // Open the DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initializing
app.whenReady().then(createWindow);

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Create a new window when the app is activated (on macOS)
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
