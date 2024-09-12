import { categories } from '@/utils/categories'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import Link from 'next/link'

const CategoriesList = ({
  category,
  search,
}: {
  category?: string
  search?: string
}) => {
  const searchTerm = search ? `&search=${search}` : ''

  return (
    <section>
      <ScrollArea className='py-6'>
        <div className='flex gap-x-4'>
          {categories.map((c, index) => {
            const isActive = c.label === category

            return (
              <Link key={index} href={`/?category=${c.label}${searchTerm}`}>
                <article
                  className={`p-3 flex flex-col items-center cursor-pointer duration-300 hover:text-primary w-[100px] ${
                    isActive && 'text-primary'
                  }`}
                >
                  <c.icon className='w-8 h-8' />
                  <p className='capitalize text-sm mt-1'>{c.label}</p>
                </article>
              </Link>
            )
          })}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  )
}
export default CategoriesList
