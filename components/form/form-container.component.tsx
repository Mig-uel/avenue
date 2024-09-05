'use client'

import { useFormState } from 'react-dom'
import { actionFunction } from '@/utils/types'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'

type FormContainerProps = {
  action: actionFunction
  children: React.ReactNode
}

const initialState = {
  message: '',
}

const FormContainer = ({ action, children }: FormContainerProps) => {
  const { toast } = useToast()
  const [state, formAction] = useFormState(action, initialState)

  useEffect(() => {
    if (state.message) toast({ description: state.message })
  }, [state])

  return <form action={formAction}>{children}</form>
}
export default FormContainer
