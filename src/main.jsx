import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import router from './router/router';
import AuthProvider from './Contexts/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <section className='font-urbanist'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </section>
  </StrictMode>,
)