import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import YTClientsPage from './pages/YTClientsPage.jsx'

const page = new URLSearchParams(window.location.search).get('page')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {page === 'yt-clients' ? <YTClientsPage /> : <App />}
  </StrictMode>,
)
