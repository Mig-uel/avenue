type Tour = {
  id: string
  name: string
  info: string
  image: string
  price: string
}

const ToursPage = async () => {
  const response = await fetch('https://www.course-api.com/react-tours-project')

  const data: Tour[] = await response.json()

  return (
    <section>
      <h1 className='text-3xl'>Tours</h1>
      {data.map((tour) => (
        <h1 key={tour.id}>{tour.name}</h1>
      ))}
    </section>
  )
}

export default ToursPage
