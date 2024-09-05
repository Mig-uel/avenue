import Link from 'next/link'

import { Button } from '../ui/button'
import { Tent } from 'lucide-react'

const Logo = () => {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <Tent className='w-6 h-6' />
      </Link>
    </Button>
  )
}

export default Logo
