import Link from 'next/link'

const HomePage = () => {
  return (
    <div>
      <h1 className='text-7xl'>HomePage</h1>
      <Link href='/about' className='text-xl text-blue-500 inline-block mt-4'>
        About
      </Link>
      <Link
        href='/info/contact'
        className='text-xl text-blue-500 inline-block mt-8'
      >
        Contact
      </Link>
    </div>
  )
}

export default HomePage
