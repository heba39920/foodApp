import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import AuthContextProvider from './Context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ToastContainer />
  <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </StrictMode>,
)
