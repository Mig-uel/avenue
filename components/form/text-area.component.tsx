import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

type TextAreaInput = {
  name: string
  label?: string
  defaultValue?: string
  placeholder?: string
}

const TextAreaInput = ({
  name,
  defaultValue = '',
  label,
  placeholder = '',
}: TextAreaInput) => {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {label || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={5}
        required
        className='leading-loose'
      />
    </div>
  )
}
export default TextAreaInput
