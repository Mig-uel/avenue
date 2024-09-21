import { fetchProfileImage } from '@/utils/actions/profile/actions'
import { CircleUserRound } from 'lucide-react'
import Image from 'next/image'

const UserIcon = async () => {
  const profileImage = await fetchProfileImage()

  return (
    <>
      {profileImage ? (
        <Image
          alt='profile image'
          src={profileImage}
          width={24}
          height={24}
          className='rounded-full object-cover h-[24px] w-[24px]'
        />
      ) : (
        <CircleUserRound className='w-6 h-6 bg-primary rounded-full text-white' />
      )}
    </>
  )
}

export default UserIcon
