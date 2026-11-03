import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { LanguageProvider } from './i18n/LanguageContext'
import { MenuProvider } from './lib/menu'
import '@fontsource-variable/bricolage-grotesque/index.css'
import './index.css'
import App from './App.jsx'

// Prevent the browser from restoring the previous scroll position on refresh.
history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <MenuProvider>
        <App />
      </MenuProvider>
      <Analytics />
    </LanguageProvider>
  </StrictMode>,
)
