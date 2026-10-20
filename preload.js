const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  dbQuery: (args) => ipcRenderer.invoke('db-query', args),
  // Any other backend route: auth/*, license/*, backup/*, owner/summary
  api: (route, body) => ipcRenderer.invoke('api', { route, body }),
  onDbChanged: (callback) => {
    const listener = (event, model) => callback(model);
    ipcRenderer.on('db-changed', listener);
    return () => ipcRenderer.removeListener('db-changed', listener);
  },
  printReceipt: () => ipcRenderer.invoke('print-receipt'),
  // The open bill as a PDF in Documents\MedBilling Bills
  savePdf: (name) => ipcRenderer.invoke('save-pdf', name),
  openPdf: (file) => ipcRenderer.invoke('open-pdf', file),
  // Auto-update from GitHub Releases
  updateStatus: () => ipcRenderer.invoke('update-status'),
  updateInstall: () => ipcRenderer.invoke('update-install'),
  onUpdateReady: (callback) => {
    const listener = (event, info) => callback(info);
    ipcRenderer.on('update-ready', listener);
    return () => ipcRenderer.removeListener('update-ready', listener);
  },
});
