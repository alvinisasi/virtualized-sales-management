"use client"

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </CacheProvider>
    </QueryClientProvider>
  )
}