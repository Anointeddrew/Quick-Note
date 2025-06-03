import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'

import { registerSW } from 'virtual:pwa-register';

registerSW({
  onNeedRefresh() {
    console.log('🟡 New content available — refresh recommended');
  },
  onOfflineReady() {
    console.log('✅ App ready to work offline');
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
