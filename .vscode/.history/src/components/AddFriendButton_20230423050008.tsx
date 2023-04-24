'use client'

import { FC } from 'react'

interface IAddFriendButtonProps {}

const AddFriendButton: FC<IAddFriendButtonProps> = ({}) => {
  return (
    <form className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by E-Mail
      </label>
    </form>
  )
}

export default AddFriendButton
