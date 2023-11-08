'use client' // ---> this line does the trick

import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
      <ChakraProvider >
        {children}
      </ChakraProvider>
  )
}

export default Providers