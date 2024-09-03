'use client'

import { createUser } from '@/utils/actions'

const Form = () => {
  return (
    <form action={createUser} className='form-style'>
      <h2 className='text-2xl capitalize mb-4'>Create User</h2>

      <input
        className='input-style'
        type='text'
        name='firstName'
        defaultValue='John'
        required
      />
      <input
        className='input-style'
        type='text'
        name='lastName'
        defaultValue='Doe'
        required
      />

      <button className='btn-style' type='submit'>
        Submit
      </button>
    </form>
  )
}

export default Form
