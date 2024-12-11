const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const store = new Store();

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // Load the index.html from a url in development
  // or the local file in production.
  const startUrl = isDev 
    ? 'http://127.0.0.1:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;

  console.log('Loading URL:', startUrl);
  
  mainWindow.loadURL(startUrl);

  // Open the DevTools in development.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle IPC messages for offline data sync
ipcMain.handle('get-offline-data', async (event, key) => {
  return store.get(key);
});

ipcMain.handle('set-offline-data', async (event, key, value) => {
  store.set(key, value);
  return true;
});

// Handle policy management
ipcMain.handle('calculate-premium', async (event, policyData) => {
  // Implement premium calculation logic
  const premium = calculatePremium(policyData);
  return premium;
});

ipcMain.handle('check-policy-lapse', async (event, policyId) => {
  // Implement policy lapse detection
  const lapseStatus = checkPolicyLapse(policyId);
  return lapseStatus;
});

// Handle till management
ipcMain.handle('process-transaction', async (event, transaction) => {
  // Store transaction locally
  const transactions = store.get('transactions') || [];
  transactions.push({
    ...transaction,
    timestamp: new Date().toISOString(),
    synced: false
  });
  store.set('transactions', transactions);
  return true;
});

// Sync offline data when online
ipcMain.handle('sync-offline-data', async () => {
  try {
    const transactions = store.get('transactions') || [];
    const unsynced = transactions.filter(t => !t.synced);
    
    // Sync with server
    for (const transaction of unsynced) {
      await syncTransaction(transaction);
      transaction.synced = true;
    }
    
    store.set('transactions', transactions);
    return true;
  } catch (error) {
    console.error('Sync failed:', error);
    return false;
  }
});

// Helper functions
function calculatePremium(policyData) {
  // Premium calculation logic
  const { age, coverAmount, term } = policyData;
  let rate = 0.05; // Base rate
  
  if (age > 50) rate += 0.02;
  if (coverAmount > 1000000) rate += 0.01;
  if (term > 10) rate += 0.01;
  
  return coverAmount * rate;
}

function checkPolicyLapse(policyId) {
  const policy = store.get(`policy_${policyId}`);
  if (!policy) return { lapsed: false };
  
  const lastPayment = new Date(policy.lastPaymentDate);
  const gracePeriod = 30; // 30 days
  const today = new Date();
  
  return {
    lapsed: (today - lastPayment) / (1000 * 60 * 60 * 24) > gracePeriod,
    daysOverdue: Math.floor((today - lastPayment) / (1000 * 60 * 60 * 24))
  };
}

async function syncTransaction(transaction) {
  // Implement server sync logic
  try {
    const response = await fetch('https://api.example.com/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    return response.ok;
  } catch (error) {
    throw new Error(`Failed to sync transaction: ${error.message}`);
  }
}
