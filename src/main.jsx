import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import router from './router/router';
import AuthProvider from './Contexts/AuthProvider';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <section className='font-urbanist'>
      <QueryClientProvider  client={queryClient} > 
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </section>
  </StrictMode>,
)