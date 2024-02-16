import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './routes/index.jsx'
import { TaskProvider } from './context/TaskProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskProvider>
      <RouterProvider router={AppRouter} />
    </TaskProvider>
  </React.StrictMode>,
)
