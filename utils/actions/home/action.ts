import db from '../../db'

export const fetchProperties = async ({
  search = '',
  category,
}: {
  search?: string
  category?: string
}) => {
  // find all properties and select certain columns
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
          tagline: { contains: search, mode: 'insensitive' },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      price: true,
      image: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return properties
}
