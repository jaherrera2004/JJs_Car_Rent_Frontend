import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rutas from './rutas.jsx';
import "./css/index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rutas/>
  </StrictMode>,
)
