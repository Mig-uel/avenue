import SubmitButton from '@/components/form/buttons.component'
import FormContainer from '@/components/form/form-container.component'
import FormInput from '@/components/form/form-input.component'
import {
  fetchProfile,
  fetchProfileImage,
  updateProfileAction,
} from '@/utils/actions/profile/actions'

const ProfilePage = async () => {
  const profile = await fetchProfile()

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Profile</h1>
      <div className='border p-8 rounded-md'>
        {/* TODO: IMAGE CONTAINER */}
        <FormContainer action={updateProfileAction}>
          <div className='grid md:grid-cols-2 gap-4 mt-4'>
            <FormInput
              type='text'
              label='First Name'
              name='firstName'
              placeholder='John'
              defaultValue={profile.firstName}
            />

            <FormInput
              type='text'
              name='lastName'
              label='Last Name'
              placeholder='Doe'
              defaultValue={profile.lastName}
            />

            <FormInput
              type='text'
              name='username'
              placeholder='johndoe'
              defaultValue={profile.username}
            />
          </div>
          <SubmitButton
            className='mt-8'
            text='Update Profile'
            loadingText='Updating'
          />
        </FormContainer>
      </div>
    </section>
  )
}
export default ProfilePage
