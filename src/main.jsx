import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { MotionConfig } from 'motion/react'
import { LanguageProvider } from './i18n/LanguageContext'
import '@fontsource/space-grotesk/latin-600.css'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <App />
        <Analytics />
      </LanguageProvider>
    </MotionConfig>
  </StrictMode>,
)
