import { AlignLeft } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { SignOutLink, UserIcon } from './'
import { nav_links } from '@/utils/nav-links'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

const LinksDropdown = async () => {
  const user = await currentUser()
  const isAdmin = user?.privateMetadata?.isAdmin

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex gap-4 max-w-[100px]'>
          <AlignLeft className='w-6 h-6' />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-52 ' align='start' sideOffset={10}>
        <SignedIn>
          {nav_links.map((link, index) => {
            if (link.label === 'admin' && !isAdmin) {
              return
            }

            return (
              <DropdownMenuItem key={index}>
                <Link href={link.href} className='capitalize w-full'>
                  {link.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
        <SignedOut>
          <DropdownMenuItem>
            <Link href='/' className='capitalize w-full'>
              Home
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <SignInButton mode='modal'>
              <button className='capitalize w-full text-left'>
                Login / Register
              </button>
            </SignInButton>
          </DropdownMenuItem>
        </SignedOut>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown
