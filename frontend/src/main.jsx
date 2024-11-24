import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider as AlertProvider,positions,transitions} from 'react-alert'
import AltertTemplate from "react-alert-template-basic"

const options={
  timeout:5000,
  transition:transitions.SCALE,
  position:positions.BOTTOM_CENTER
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AlertProvider template={AltertTemplate} {...options}>
       <App />
      </AlertProvider>
  </StrictMode>,
)
