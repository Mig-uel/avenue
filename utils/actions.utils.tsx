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

export const saveUser = async (user: User) => {
  const users = await fetchUsers()

  users.push(user)

  await fs.writeFile('users.json', JSON.stringify(users))
}

export const deleteUser = async (formData: FormData) => {
  const formObject = Object.fromEntries(formData)

  const users = await fetchUsers()
  const updatedUsers = users.filter((u) => u.id !== formObject.id)

  await fs.writeFile('users.json', JSON.stringify(updatedUsers))

  revalidatePath('/actions')
}

export const removeUser = async (id: string, formData: FormData) => {
  const name = formData.get('name') as string

  const users = await fetchUsers()
  const updatedUsers = users.filter((user) => user.id !== id)

  await fs.writeFile('users.json', JSON.stringify(updatedUsers))
  revalidatePath('/actions')
}
