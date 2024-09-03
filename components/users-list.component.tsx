import { fetchUsers } from '@/utils/actions.utils'

const UsersList = async () => {
  const users = await fetchUsers()

  return (
    <div className='mt-4'>
      <h3 className='text-2xl'>Users</h3>
      {users.length ? (
        <div>
          {users.map((user) => (
            <h4 key={user.id} className='capitalize text-lg'>
              {user.firstName} {user.lastName}
            </h4>
          ))}
        </div>
      ) : (
        <p>No users found...</p>
      )}
    </div>
  )
}

export default UsersList
