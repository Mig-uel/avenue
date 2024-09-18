import Image from 'next/image'

const ImageContainer = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <section className='h-[300px] md:h-[500px] relative mt-8'>
      <Image
        src={src}
        alt={alt}
        fill
        sizes='100vw'
        className='object-cover rounded'
        priority
      />
    </section>
  )
}
export default ImageContainer
