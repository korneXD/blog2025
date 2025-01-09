import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import { UserProvider } from './context/UserContext.jsx'
import { CategProvider } from './context/CategContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CategProvider>
      <UserProvider>
        <App />
      </UserProvider>
      </CategProvider>
    </ThemeProvider>
  </StrictMode>,
)
