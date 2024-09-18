'use client'

import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '../ui/input'

// TODO: fetch properties from db, get their names, randomize order, place as placeholder for nav search

const NavSearch = () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const [search, setSearch] = useState<string>(
    searchParams.get('search')?.toString() || ''
  )

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }

    replace(`/?${params.toString()}`)
  }, 500)

  return (
    <Input
      type='text'
      placeholder='search from thousands of properties...'
      className='max-w-xs dark:bg-muted'
      value={search}
      onChange={(e) => {
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
    />
  )
}

export default NavSearch
