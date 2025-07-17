import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div className="w-full h-screen bg-background" />}>
      <App />
    </Suspense>
  </React.StrictMode>
)
