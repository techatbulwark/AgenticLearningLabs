import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import { PrereqModalProvider } from './context/PrereqModalContext.jsx'
import { InquiryModalProvider } from './context/InquiryModalContext.jsx'
import { PromptKitModalProvider } from './context/PromptKitModalContext.jsx'
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PrereqModalProvider>
        <InquiryModalProvider>
          <PromptKitModalProvider>
            <App />
            <Analytics />
          </PromptKitModalProvider>
        </InquiryModalProvider>
      </PrereqModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
