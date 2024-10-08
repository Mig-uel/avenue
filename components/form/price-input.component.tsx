import { Input } from '../ui/input'
import { Label } from '../ui/label'

type PriceInput = {
  defaultValue?: number
}

const PriceInput = ({ defaultValue }: PriceInput) => {
  return (
    <div className='mb-2'>
      <Label htmlFor='price' className='capitalize'>
        Nightly Price ($)
      </Label>
      <Input
        type='number'
        id='price'
        name='price'
        min={0}
        className='border'
        placeholder='100'
        required
        defaultValue={defaultValue}
      />
    </div>
  )
}
export default PriceInput
