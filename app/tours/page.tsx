import Link from 'next/link'

type Tour = {
  id: string
  name: string
  info: string
  image: string
  price: string
}

const fetchTours = async () => {
  const response = await fetch('https://www.course-api.com/react-tours-project')

  const data: Tour[] = await response.json()

  return data
}

const ToursPage = async () => {
  const data = await fetchTours()

  return (
    <section>
      <h1 className='text-4xl mb-4'>Tours</h1>
      {data.map((tour) => (
        <Link
          className='block text-blue-400 text-2xl'
          href={`/tours/${tour.id}`}
          key={tour.id}
        >
          {tour.name}
        </Link>
      ))}
    </section>
  )
}

export default ToursPage
