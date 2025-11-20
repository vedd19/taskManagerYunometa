import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { Login } from './pages/Login.jsx'
import { TaskContextProvider } from './context/TaskContextProvider.jsx'
import { SnackbarProvider } from 'notistack'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SnackbarProvider><TaskContextProvider><App /></TaskContextProvider></SnackbarProvider>,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      }],
  }
])

const root = createRoot(document.getElementById('root'))
root.render(
  <RouterProvider router={router} />
)
