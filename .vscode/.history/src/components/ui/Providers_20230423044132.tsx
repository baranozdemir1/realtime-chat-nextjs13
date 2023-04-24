'use client'

import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface IProvidersProps {
  children: ReactNode
}

const Providers: FC<IProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      Providers
    </>
  )
}

export default Providers
