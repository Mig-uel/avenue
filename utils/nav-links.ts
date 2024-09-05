type NavLink = {
  href: string
  label: string
}

export const nav_links: NavLink[] = [
  {
    href: '/',
    label: 'home',
  },
  {
    href: '/favorites',
    label: 'favorites',
  },
  {
    href: '/bookings',
    label: 'bookings',
  },
  {
    href: '/reviews',
    label: 'reviews',
  },
  {
    href: '/rentals/create',
    label: 'create rental',
  },
  {
    href: '/rentals',
    label: 'rentals',
  },
  {
    href: '/profile',
    label: 'profile',
  },
]
