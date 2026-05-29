import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SavedLessonsProvider } from "./context/SavedLessonsContext";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SavedLessonsProvider>
      <App />
    </SavedLessonsProvider>
  </StrictMode>,
)
