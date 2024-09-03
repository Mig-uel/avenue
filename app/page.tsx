import Link from 'next/link'

const HomePage = () => {
  return (
    <div>
      <h1 className='text-7xl'>HomePage</h1>
      <Link href='/about' className='text-xl text-blue-500 mt-4'>
        About
      </Link>
    </div>
  )
}

export default HomePage
