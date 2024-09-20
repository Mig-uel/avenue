import FavoriteButton from '@/components/card/favorite-button.component'
import PropertyRating from '@/components/card/property-rating.component'
import Amenities from '@/components/properties/amenities.component'
import Breadcrumbs from '@/components/properties/breadcrumbs.component'
import Description from '@/components/properties/description.component'
import ImageContainer from '@/components/properties/image-container.component'
import PropertyDetails from '@/components/properties/property-details.component'
import ShareButton from '@/components/properties/share-button.component'
import UserInfo from '@/components/properties/user-info.component'
import PropertyReviews from '@/components/reviews/property-reviews.component'
import SubmitReview from '@/components/reviews/submit-review.component'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchPropertyDetails } from '@/utils/actions/property/action'
import { findExistingReview } from '@/utils/actions/reviews/action'
import { currentUser } from '@clerk/nextjs/server'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

const DynamicMap = dynamic(
  () => import('@/components/properties/map.component'),
  {
    ssr: false,
    loading: () => <Skeleton className='h-[400px] w-full' />,
  }
)
import BookingWrapper from '@/components/booking/booking-wrapper.component'

const PropertyDetailsPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const property = await fetchPropertyDetails(id)
  if (!property) redirect('/')

  const user = await currentUser()
  const isOwner = user && property.profile.clerkId === user.id
  const reviewDoesNotExist =
    user && !isOwner && !(await findExistingReview(user.id, property.id))

  const {
    name,
    baths,
    bedrooms,
    beds,
    guests,
    tagline,
    image,
    description,
    profile: { firstName, profileImage },
  } = property
  const details = { baths, bedrooms, beds, guests }

  return (
    <section>
      <Breadcrumbs name={name} />

      <header className='flex justify-between items-center mt-4'>
        <h1 className='text-4xl font-bold capitalize'>{tagline}</h1>

        <div className='flex items-center gap-x-4'>
          <ShareButton propertyId={property.id} name={name} />
          <FavoriteButton propertyId={property.id} />
        </div>
      </header>

      <ImageContainer src={image} alt={name} />

      <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
        <div className={`${user ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <div className='flex gap-x-4 items-center'>
            <h1 className='text-xl font-bold'>{property.name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
          <PropertyDetails {...details} />
          <UserInfo firstName={firstName} profileImageSrc={profileImage} />
          <Separator className='mt-4' />
          <Description description={description} />
          <Amenities amenities={property.amenities} />
          <DynamicMap countryCode={property.country} />
        </div>
        <div className='lg:col-span-4 flex flex-col items-center'>
          <BookingWrapper
            propertyId={property.id}
            bookings={property.bookings}
            price={property.price}
          />
        </div>
      </section>
      {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
      <PropertyReviews propertyId={property.id} />
    </section>
  )
}
export default PropertyDetailsPage
