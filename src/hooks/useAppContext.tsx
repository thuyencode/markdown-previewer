import { Context } from '@/context/ContextProvider'
import { useContext } from 'react'

export default function useAppContext() {
  const context = useContext(Context)

  if (context == null) {
    throw new Error('Must be used within ContextProvider')
  }

  return context
}
