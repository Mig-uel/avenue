import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormInputProps = {
  name: string
  type: string
  label?: string
  defaultValue?: string
  placeholder?: string
}

const ProfilePage = ({
  name,
  type,
  label,
  defaultValue,
  placeholder,
}: FormInputProps) => {
  return (
    <div className='mb-2'>
      <Label className='capitalize' htmlFor={name}>
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || ''}
        required
      />
    </div>
  )
}
export default ProfilePage
