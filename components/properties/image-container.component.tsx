import Image from 'next/image'

const ImageContainer = ({ src, name }: { src: string; name: string }) => {
  return (
    <section className='h-[300px] md:h-[500px] relative mt-8'>
      <Image
        src={src}
        alt={name}
        fill
        sizes='100vw'
        className='object-cover rounded'
        priority
      />
    </section>
  )
}
export default ImageContainer
