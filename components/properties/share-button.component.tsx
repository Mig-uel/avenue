'use client'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'
import { LucideShare2 } from 'lucide-react'

const ShareButton = ({
  propertyId,
  name,
}: {
  propertyId: string
  name: string
}) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL
  const shareLink = `${url}/properties/${propertyId}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon' className='p-2'>
          <LucideShare2 />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side='top'
        align='end'
        sideOffset={10}
        className='flex items-center gap-x-2 justify-center w-full'
      >
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <EmailShareButton url={shareLink} title={name}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  )
}
export default ShareButton
