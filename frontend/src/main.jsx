import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrereqModalProvider } from './context/PrereqModalContext.jsx'
import './index.css'
import App from './App.jsx'
import { InquiryModalProvider } from './context/InquiryModalContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PrereqModalProvider>
        <InquiryModalProvider>
          <App />
        </InquiryModalProvider>
      </PrereqModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
