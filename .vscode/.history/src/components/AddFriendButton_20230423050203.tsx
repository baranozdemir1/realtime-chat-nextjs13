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
      <input
        type="text"
        className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </form>
  )
}

export default AddFriendButton
