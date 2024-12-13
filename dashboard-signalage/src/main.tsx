import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from './App.tsx'
import ContentPage from './pages/ContentPage.tsx'
import {  NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashboardPage from './pages/DashboardPage.tsx'
import FilePage from './pages/FilePage.tsx'
import SocketIoProvider from './SocketContext.tsx'



const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}>
    <SocketIoProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>

          <Routes >
            <Route path='/' element={<App />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/file/:id' element={<FilePage />} />
            {/* <Route path='/file/content/:id' element={<ContentPage />} /> */}

          </Routes>
        </NextUIProvider>
        {/* <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-left" /> */}
      </QueryClientProvider >
    </SocketIoProvider >
  </BrowserRouter>
)
