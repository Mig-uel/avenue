import SubmitButton from '@/components/form/buttons.component'
import CategoriesInput from '@/components/form/categories-input.component'
import FormContainer from '@/components/form/form-container.component'
import FormInput from '@/components/form/form-input.component'
import PriceInput from '@/components/form/price-input.component'
import { createPropertyAction } from '@/utils/actions/property/action'

const CreatePropertyPage = () => {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        Create Property
      </h1>

      <div className='border p-8 rounded'>
        <h3 className='text-lg mb-4 font-medium'>General Info</h3>

        <FormContainer action={createPropertyAction}>
          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormInput
              name='name'
              type='text'
              placeholder='Cabin in Upstate New York'
            />
            <FormInput
              name='tagline'
              type='text'
              placeholder='Spookiest Woody Cabin'
            />
            <PriceInput />
            <CategoriesInput />
          </div>
          {/* TODO: text area / description */}
          <SubmitButton text='create rental' className='mt-12' />
        </FormContainer>
      </div>
    </section>
  )
}
export default CreatePropertyPage
