import Image from 'next/image'

type UserInfo = {
  profileImageSrc: string
  firstName: string
  alt?: string
}

const UserInfo = ({
  profileImageSrc,
  firstName,
  alt = 'user profile image',
}: UserInfo) => {
  return (
    <article className='grid grid-cols-[auto,1fr] gap-4 mt-4'>
      <Image
        src={profileImageSrc}
        alt={alt}
        width={50}
        height={50}
        className='rounded w-12 h-12 object-cover'
      />

      <div>
        <p>
          Hosted by <span className='font-bold'>{firstName}</span>
        </p>
        <p className='text-muted-foreground font-light'>
          Superhost &middot; 2 years hosting
        </p>
      </div>
    </article>
  )
}
export default UserInfo
