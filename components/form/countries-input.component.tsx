import { formattedCountries } from '@/utils/countries'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type CountriesInput = {
  defaultValue?: string
}

const CountriesInput = ({ defaultValue }: CountriesInput) => {
  return (
    <div className='mb-2'>
      <Label htmlFor='country' className='capitalize'>
        Country
      </Label>
      <Select
        defaultValue={defaultValue || formattedCountries[0].code}
        name='country'
        required
      >
        <SelectTrigger id='country'>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {formattedCountries.map((country, index) => (
            <SelectItem key={index} value={country.code}>
              <span className='flex items-center'>{country.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
export default CountriesInput
