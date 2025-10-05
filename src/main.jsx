import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/rtl.css'
import './i18n/config.js'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
