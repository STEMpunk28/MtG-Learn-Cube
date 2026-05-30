import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LanguageProvider } from "./context/LanguageContext";
import { SavedLessonsProvider } from "./context/SavedLessonsContext";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SavedLessonsProvider>
        <App />
      </SavedLessonsProvider>
    </LanguageProvider>
  </StrictMode>,
)
