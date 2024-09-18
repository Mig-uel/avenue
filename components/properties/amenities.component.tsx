import Title from './title.component'
import { LucideFolderCheck } from 'lucide-react'
import type { Amenity } from '@/utils/amenities'

const Amenities = ({ amenities }: { amenities: string }) => {
  const amenitiesArray: Amenity[] = JSON.parse(amenities as string)

  const noAmenities = amenitiesArray.every((amenity) => !amenity.selected)

  if (noAmenities) return null

  return (
    <div className='mt-4'>
      <Title text='What this place offers' />

      <div className='grid md:grid-cols-2 gap-x-4'>
        {amenitiesArray.map((a, index) => {
          if (!a.selected) return

          return (
            <div key={index} className='flex items-center gap-x-4 mb-2'>
              <LucideFolderCheck className='h-6 w-6 text-primary' />
              <span className='font-light text0-sm capitalize'>{a.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Amenities
