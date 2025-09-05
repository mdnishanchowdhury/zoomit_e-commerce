import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { store } from "./redux/store";

import { router } from './Router/router.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import AuthProvider from './Providers/AuthProvider.jsx';
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
