'use client'

import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet'
import { findCountryByCode } from '@/utils/countries'
import Title from './title.component'
import CountryName from '../card/country-name.component'
import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const iconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png'
const markerIcon = icon({
  iconUrl,
  iconSize: [20, 30],
})

const Map = ({ countryCode }: { countryCode: string }) => {
  const fallbackLocation: [number, number] = [51.505, -0.09]
  const location: [number, number] | undefined =
    findCountryByCode(countryCode)?.location

  return (
    <div className='mt-4'>
      <div className='mb-4'>
        <Title text='Where you will be staying' />
        <CountryName countryCode={countryCode} />
      </div>

      <MapContainer
        scrollWheelZoom={false}
        zoomControl={false}
        className='h-[300px] rounded-lg relative z-0'
        center={location || fallbackLocation}
        zoom={7}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ZoomControl position='bottomright' />
        <Marker position={location || fallbackLocation} icon={markerIcon} />
      </MapContainer>
    </div>
  )
}
export default Map
