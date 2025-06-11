import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import AuthContextProvider from './Context/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {FavoriteListContextProvider} from './Context/FavoriteListContext.jsx';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ToastContainer />
  <FavoriteListContextProvider>
  <AuthContextProvider>
  <QueryClientProvider client={queryClient}>
    <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </AuthContextProvider>
    </FavoriteListContextProvider>
  </StrictMode>,
)
