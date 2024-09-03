'use server'

import fs from 'fs/promises'

type User = {
  id?: string
  firstName?: string
  lastName?: string
}

export const createUser = async (formData: FormData) => {
  const formObject: User = Object.fromEntries(formData)

  const user: User = {
    firstName: formObject.firstName,
    lastName: formObject.lastName,
    id: Date.now().toString(),
  }

  await saveUser(user)
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
