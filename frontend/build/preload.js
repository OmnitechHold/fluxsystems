const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'api', {
    // Policy Management
    calculatePremium: (policyData) => {
      return ipcRenderer.invoke('calculate-premium', policyData);
    },
    checkPolicyLapse: (policyId) => {
      return ipcRenderer.invoke('check-policy-lapse', policyId);
    },
    
    // Offline Data Management
    getOfflineData: (key) => {
      return ipcRenderer.invoke('get-offline-data', key);
    },
    setOfflineData: (key, value) => {
      return ipcRenderer.invoke('set-offline-data', key, value);
    },
    
    // Till Management
    processTransaction: (transaction) => {
      return ipcRenderer.invoke('process-transaction', transaction);
    },
    
    // Data Synchronization
    syncOfflineData: () => {
      return ipcRenderer.invoke('sync-offline-data');
    },
    
    // Event Listeners
    onSyncComplete: (callback) => {
      ipcRenderer.on('sync-complete', callback);
    },
    onSyncError: (callback) => {
      ipcRenderer.on('sync-error', callback);
    },
    onNetworkStatus: (callback) => {
      ipcRenderer.on('network-status', callback);
    }
  }
);
