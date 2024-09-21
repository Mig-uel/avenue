import SubmitButton from '@/components/form/buttons.component'
import CategoriesInput from '@/components/form/categories-input.component'
import CounterInput from '@/components/form/counter-input.component'
import CountriesInput from '@/components/form/countries-input.component'
import FormContainer from '@/components/form/form-container.component'
import FormInput from '@/components/form/form-input.component'
import ImageInputContainer from '@/components/form/image-input-container.component'
import PriceInput from '@/components/form/price-input.component'
import TextAreaInput from '@/components/form/text-area.component'
import Title from '@/components/properties/title.component'
import { fetchPropertyDetails } from '@/utils/actions/property/action'
import {
  updatePropertyAction,
  updatePropertyImageAction,
} from '@/utils/actions/rentals/actions'
import { redirect } from 'next/navigation'

const EditRentalPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  const property = await fetchPropertyDetails(id)
  if (!property) return redirect('/')

  const updateImage = updatePropertyImageAction.bind(null, { propertyId: id })
  const updateProperty = updatePropertyAction.bind(null, { propertyId: id })

  return (
    <section>
      <Title text='Edit Rental' />

      <div className='border p-8 rounded-md'>
        <ImageInputContainer
          name={property.name}
          text='Update Image'
          action={updateImage}
          image={property.image}
        />

        <FormContainer action={updateProperty}>
          <div className='grid md:grid-cols-2 gap-8 mb-4 mt-8'>
            <FormInput
              name='name'
              label='Name'
              defaultValue={property.name}
              type='text'
            />

            <FormInput
              name='tagline'
              type='text'
              defaultValue={property.tagline}
            />

            <PriceInput defaultValue={property.price} />

            <CategoriesInput defaultValue={property.category} />

            <CountriesInput defaultValue={property.country} />
          </div>

          <TextAreaInput
            name='description'
            label='Description'
            defaultValue={property.description}
          />

          <h3 className='text-lg mt-8 mb-4 font-medium'>
            Accommodation Details
          </h3>

          <CounterInput detail='guests' defaultValue={property.guests} />
          <CounterInput detail='bedrooms' defaultValue={property.bedrooms} />
          <CounterInput detail='beds' defaultValue={property.beds} />
          <CounterInput detail='baths' defaultValue={property.baths} />

          {/* TODO: amenities */}

          <SubmitButton text='edit property' className='mt-12' />
        </FormContainer>
      </div>
    </section>
  )
}
export default EditRentalPage
