import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './components/Admin/widgets/layout/ThemeContext.jsx'
import Background from './components/Admin/widgets/layout/pages/Background.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <ThemeProvider>
      <Background>
       
    <App />
    </Background>
    </ThemeProvider>
    </AuthProvider>
    <ToastContainer />

  </React.StrictMode>,
)
