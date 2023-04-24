'use client'

import { ButtonHTMLAttributes, FC, useState } from 'react'
import Button from '../components/ui/Button'
import { signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Loader2, LogOut } from 'lucide-react'

interface ISignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<ISignOutButtonProps> = ({ ...props }) => {
  const [isSigninOut, setIsSigninOut] = useState<boolean>(false)

  return (
    <Button
      {...props}
      variant={'ghost'}
      onClick={async () => {
        setIsSigninOut(true)
        try {
          await signOut()
        } catch (error) {
          toast.error('There was a problem signing out.')
        } finally {
          setIsSigninOut(false)
        }
      }}
    >
      {isSigninOut ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </Button>
  )
}

export default SignOutButton
