import { SubmitButton } from '@/components/form/buttons.component'
import FormInput from '@/components/form/form-input.component'

const createProfileAction = async (formData: FormData) => {
  'use server'

  const formDataObject = Object.fromEntries(formData)

  console.log(formDataObject)

  return {
    message: 'Profile created.',
  }
}

const CreateProfilePage = () => {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Create Profile</h1>
      <div className='border p-8 rounded-md'>
        <form action={createProfileAction}>
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
        </form>
      </div>
    </section>
  )
}
export default CreateProfilePage
