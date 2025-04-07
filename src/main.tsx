
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from './contexts/context.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'
import Skeleton from './components/UI/Skeleton.tsx'

  // const client = new QueryClient({
  //   defaultOptions:{
  //     queries : {suspense:true}
  //   }
  // })

  const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <Provider>  
    <QueryClientProvider client={client}>
        <App />  
      {/* <React.Suspense fallback={<Skeleton />}>
      </React.Suspense> */}
    </QueryClientProvider>
  </Provider>, 
)
