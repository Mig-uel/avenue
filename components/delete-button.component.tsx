import { deleteUser, removeUser } from '@/utils/actions.utils'

const DeleteButton = ({ id }: { id: string }) => {
  return (
    <form action={deleteUser}>
      <input type='hidden' name='id' value={id} />
      <button
        type='submit'
        className='bg-red-500 text-white text-xs rounded p-2'
      >
        Delete
      </button>
    </form>
  )
}

export default DeleteButton
