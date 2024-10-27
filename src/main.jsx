import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProjectDataContextProvider from './store/projectDataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectDataContextProvider>
      <App />
    </ProjectDataContextProvider>
  </React.StrictMode>,
)
