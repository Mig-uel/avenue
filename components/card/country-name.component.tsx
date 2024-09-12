import { findCountryByCode } from '@/utils/countries'

const CountryName = ({ countryCode }: { countryCode: string }) => {
  const country = findCountryByCode(countryCode)!

  const countryName =
    country.name.length > 20
      ? `${country.name.substring(0, 20)}...`
      : country.name

  return (
    <span className='flex justify-between items-center gap-2'>
      {countryName}
    </span>
  )
}
export default CountryName
