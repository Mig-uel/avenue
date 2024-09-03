'use server'

export const createUser = async (formData: FormData) => {
  const formObject = Object.fromEntries(formData)

  console.log(formObject)
}
