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
});
