'use client'

import { useState } from 'react'
import { amenities, type Amenity } from '@/utils/amenities'
import { Checkbox } from '../ui/checkbox'

type AmenitiesInput = {
  defaultValue?: Amenity[]
}

const AmenitiesInput = ({ defaultValue }: AmenitiesInput) => {
  const [selected, setSelected] = useState<Amenity[]>(defaultValue || amenities)

  const handleChange = (amenity: Amenity) => {
    setSelected((prev) => {
      return prev.map((p) => {
        if (p.name === amenity.name) return { ...p, selected: !p.selected }

        return p
      })
    })
  }

  return (
    <section>
      <input type='hidden' name='amenities' value={JSON.stringify(selected)} />

      <div className='grid grid-cols-2 gap-4'>
        {selected.map((amenity, index) => (
          <div key={index} className='flex items-center space-x-2'>
            <Checkbox
              id={amenity.name}
              checked={amenity.selected}
              onCheckedChange={() => handleChange(amenity)}
            />
            <label
              htmlFor={amenity.name}
              className='text-sm font-medium leading-none capitalize flex gap-x-2 items-center'
            >
              {amenity.name} <amenity.icon className='w-4 h-4' />
            </label>
          </div>
        ))}
      </div>
    </section>
  )
}
export default AmenitiesInput
