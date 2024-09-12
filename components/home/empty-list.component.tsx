import Link from 'next/link'
import { Button } from '../ui/button'

const EmptyList = ({
  heading = 'No items in the list',
  message = 'Keep exploring our properties',
  buttonText = 'Back Home',
}: {
  heading?: string
  message?: string
  buttonText?: string
}) => {
  return (
    <div className='mt-4'>
      <h2 className='text-xl font-bold'>{heading}</h2>
      <p className='text-lg'>{message}</p>
      <Button asChild className='mt-4 capitalize' size='lg'>
        <Link href='/'>{buttonText}</Link>
      </Button>
    </div>
  )
}
export default EmptyList
