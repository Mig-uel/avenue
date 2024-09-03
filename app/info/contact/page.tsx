import Link from 'next/link'

const ContactPage = () => {
  return (
    <div>
      <h1 className='text-7xl'>ContactPage</h1>
      <Link href='/' className='text-xl text-blue-500 inline-block mt-8'>
        Home
      </Link>
    </div>
  )
}

export default ContactPage
