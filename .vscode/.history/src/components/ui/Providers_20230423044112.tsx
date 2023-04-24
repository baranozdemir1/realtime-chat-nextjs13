'use client'

import { FC } from 'react'
import { Toaster } from 'react-hot-toast'

interface IProvidersProps {}

const Providers: FC<IProvidersProps> = ({}) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      Providers
    </>
  )
}

export default Providers
