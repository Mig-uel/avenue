'use client'

const Error = ({ error }: { error: Error }) => {
  console.log(error)
  return (
    <h1 className='text-xl uppercase text-red-500'>
      there was an error, please try again later...{' '}
    </h1>
  )
}

export default Error
