import { createClient } from '@supabase/supabase-js'

const bucket = 'avenue'
const url = process.env.SUPABASE_URL as string
const key = process.env.SUPABASE_PUBLIC_KEY as string

const supabase = createClient(url, key)

export const uploadImage = async (image: File) => {
  const timestamp = Date.now()
  const imageNameArray = image.name.split('.')

  const imageName = `${timestamp}.${imageNameArray.pop()}`

  const { data } = await supabase.storage
    .from(bucket)
    .upload(imageName, image, { cacheControl: '0' })

  if (!data) throw new Error('Image upload failed')

  return supabase.storage.from(bucket).getPublicUrl(imageName).data.publicUrl
}

// TODO: FIX REMOVE OLD IMAGE FUNCTIONALITY
export const removeOldImage = async (imageURL: string) => {
  const imageURLArray = imageURL.split('/')

  const fileToDelete = `${imageURLArray.pop()}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([fileToDelete])

  console.log(data)
  console.log(error)
}
