import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './components/Login/Login.tsx'
import Cadastra from './components/Cadastra/Cadastra.tsx'
import Layout from './components/Layout/Layout.tsx'
import Carrinho from './components/Carrinho/Carrinho.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <App/>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/cadastra',
        element: <Cadastra />,
      },
      {
        path: '/carrinho',
        element: <Carrinho/>
      }

    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <RouterProvider router={router} />
  </StrictMode>,
)
