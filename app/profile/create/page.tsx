import SubmitButton from '@/components/form/buttons.component'
import FormInput from '@/components/form/form-input.component'
import FormContainer from '@/components/form/form-container.component'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

// form action
import { createProfileAction } from '@/utils/actions/profile/actions'

const CreateProfilePage = async () => {
  const user = await currentUser()

  if (user?.privateMetadata?.hasProfile) redirect('/')

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Create Profile</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createProfileAction}>
          <div className='grid md:grid-cols-2 gap-4 mt-4'>
            <FormInput
              name='firstName'
              label='First Name'
              type='text'
              placeholder='John'
            />

            <FormInput
              name='lastName'
              label='Last Name'
              type='text'
              placeholder='Doe'
            />

            <FormInput name='username' type='text' placeholder='johndoe' />
          </div>
          <SubmitButton text='Create Profile' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  )
}
export default CreateProfilePage
