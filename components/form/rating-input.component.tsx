import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const RatingInput = ({
  name,
  labelText,
}: {
  name: string
  labelText?: string
}) => {
  // array of rating numbers (1 - 5)
  const range = Array.from({ length: 5 }, (_, index) => {
    const value = index + 1

    return value.toString()
  }).reverse()

  return (
    <div className='mb-2 max-w-xs'>
      <Label htmlFor={name} className='capitalize'>
        {labelText || name}
      </Label>

      <Select defaultValue={range[0]} name={name} required>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {range.map((num) => (
            <SelectItem key={num} value={num}>
              {num}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
export default RatingInput
