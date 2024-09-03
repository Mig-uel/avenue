import Image from 'next/image'
import vrImg from '@/images/vr.jpg'

const imageSrc = 'https://www.course-api.com/images/tours/tour-1.jpeg'

const Tour = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <section className='flex gap-x-4 mt-4'>
        {/* local image */}
        <div>
          <Image
            priority={true}
            src={vrImg}
            alt='young adult with an vr headset'
            className='w-48 h-48 object-cover rounded'
            width={192}
            height={192}
          />
          <h2>local image</h2>
        </div>

        {/* remote image */}
        {/* remote images require width and height */}
        <div>
          <Image
            className='w-48 h-48 object-cover rounded'
            src={imageSrc}
            alt='tour image'
            width={192}
            height={192}
          />
          <h2>remote image</h2>
        </div>
      </section>
      <h1 className='text-4xl'>ID: {params.id}</h1>
    </div>
  )
}

export default Tour
