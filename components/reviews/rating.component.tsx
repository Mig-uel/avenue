import { FaStar, FaRegStar } from 'react-icons/fa'

const Rating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    return index + 1 <= rating
  })

  return (
    <div className='flex items-center gap-x-1'>
      {stars.map((isTrue, index) => {
        const className = `w-3 h-3 ${isTrue ? 'text-primary' : 'text-gray-400'}`

        return isTrue ? (
          <FaStar className={className} key={index} />
        ) : (
          <FaRegStar className={className} key={index} />
        )
      })}
    </div>
  )
}
export default Rating
