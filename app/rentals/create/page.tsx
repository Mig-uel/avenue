import SubmitButton from '@/components/form/buttons.component'
import CategoriesInput from '@/components/form/categories-input.component'
import CounterInput from '@/components/form/counter-input.component'
import CountriesInput from '@/components/form/countries-input.component'
import FormContainer from '@/components/form/form-container.component'
import FormInput from '@/components/form/form-input.component'
import ImageInput from '@/components/form/image-input.component'
import PriceInput from '@/components/form/price-input.component'
import TextAreaInput from '@/components/form/text-area.component'
import { createPropertyAction } from '@/utils/actions/property/action'

const placeholder =
  'Nestled deep in the heart of upstate New York, this eerie Victorian mansion stands as a chilling testament to the supernatural. Shrouded in mist and surrounded by ancient, gnarled trees, the property exudes an unsettling aura, with creaking floors and whispers echoing through its dusty halls. The once-grand estate, now cloaked in cobwebs and shadows, is rumored to be haunted by restless spirits from a forgotten past. With its flickering candlelight and the distant wail of a mournful wind, this haunted abode invites only the bravest souls to uncover its dark secrets.'

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
            {/* name input */}
            <FormInput
              name='name'
              type='text'
              placeholder='Cabin in Upstate New York'
            />

            {/* tagline input */}
            <FormInput
              name='tagline'
              type='text'
              placeholder='Spookiest Woody Cabin'
            />

            {/* price input */}
            <PriceInput />

            {/* category input */}
            <CategoriesInput />
          </div>

          <div className='grid sm:grid-cols-2 gap-8 mt-4'>
            {/* country input */}
            <CountriesInput />

            {/* image input */}
            <ImageInput />
          </div>

          {/* description input */}
          <TextAreaInput name='description' placeholder={placeholder} />

          {/* accommodation details */}
          <h3 className='text-lg mt-8 mb-4 font-medium'>
            Accommodation Details
          </h3>
          <CounterInput detail='guests' />
          <CounterInput detail='bedrooms' />
          <CounterInput detail='beds' />
          <CounterInput detail='baths' />

          <SubmitButton text='create rental' className='mt-12' />
        </FormContainer>
      </div>
    </section>
  )
}
export default CreatePropertyPage
