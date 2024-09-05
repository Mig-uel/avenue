import FormInput from '@/components/form/form-input.component'
import { Button } from '@/components/ui/button'

const createProfileAction = async (formData: FormData) => {
  'use server'

  const formDataObject = Object.fromEntries(formData)

  console.log(formDataObject)
}

const CreateProfilePage = () => {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>New User</h1>
      <div className='border p-8 rounded-md max-w-lg'>
        <form action={createProfileAction}>
          <FormInput
            name='firstName'
            label='First Name'
            type='text'
            placeholder='John'
          />
          <Button type='submit' size='lg'>
            Create Profile
          </Button>
        </form>
      </div>
    </section>
  )
}
export default CreateProfilePage
