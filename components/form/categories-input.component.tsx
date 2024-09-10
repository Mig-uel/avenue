import { categories } from '@/utils/categories'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type CategoriesInput = {
  defaultValue?: string
}

const CategoriesInput = ({ defaultValue }: CategoriesInput) => {
  return (
    <div className='mb-2'>
      <Label htmlFor='category' className='capitalize'>
        Categories
      </Label>
      <Select
        defaultValue={defaultValue || categories[0].label}
        name='category'
      >
        <SelectTrigger id='category'>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {categories.map((category, index) => (
            <SelectItem key={index} value={category.label}>
              <span className='flex items-center gap-2 capitalize'>
                <category.icon />
                {category.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
export default CategoriesInput
