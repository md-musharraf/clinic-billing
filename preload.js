const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping'),
  // Database Queries
  dbQuery: (args) => ipcRenderer.invoke('db-query', args),
  onDbChanged: (callback) => {
    const listener = (event, model) => callback(model);
    ipcRenderer.on('db-changed', listener);
    return () => ipcRenderer.removeListener('db-changed', listener);
  },
  // Authentication
  authLogin: (credentials) => ipcRenderer.invoke('auth-login', credentials),
  authRecover: (data) => ipcRenderer.invoke('auth-recover', data),
  authSetupStatus: () => ipcRenderer.invoke('auth-setup-status'),
  authSetup: (data) => ipcRenderer.invoke('auth-setup', data),
  // Backups
  backupExport: () => ipcRenderer.invoke('backup-export'),
  backupRestore: (file) => ipcRenderer.invoke('backup-restore', file),
  // Licensing
  licenseCheck: () => ipcRenderer.invoke('license-check'),
  licenseActivate: (key) => ipcRenderer.invoke('license-activate', key),
  licenseGenerateAdminKey: (data) => ipcRenderer.invoke('license-generate-admin-key', data),
  // Printing
  printReceipt: () => ipcRenderer.invoke('print-receipt'),
});
