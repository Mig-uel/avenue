'use server'

import fs from 'fs/promises'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type User = {
  id?: string
  firstName?: string
  lastName?: string
}

export const createUser = async (prevState: any, formData: FormData) => {
  try {
    const formObject: User = Object.fromEntries(formData)

    const user: User = {
      firstName: formObject.firstName,
      lastName: formObject.lastName,
      id: Date.now().toString(),
    }

    await saveUser(user)
    revalidatePath('/actions')

    return 'User created!'
  } catch (error) {
    console.log(error)
    return 'Failed to create user!'
  }
}

export const fetchUsers = async (): Promise<User[]> => {
  const result = await fs.readFile('users.json', { encoding: 'utf8' })

  const users = result ? JSON.parse(result) : []

  return users
}

const saveUser = async (user: User) => {
  const users = await fetchUsers()

  users.push(user)

  await fs.writeFile('users.json', JSON.stringify(users))
}
