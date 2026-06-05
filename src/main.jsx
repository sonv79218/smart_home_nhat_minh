import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import { AppProvider } from './contexts/AppContext'
import { ToastProvider } from './contexts/ToastContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AppProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </AppProvider>
    </ToastProvider>
  </StrictMode>,
)
