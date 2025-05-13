import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserView = () => {
  const displayUsers = useSelector(state => state.users)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th style={{ padding: '10px 20px' }}>User</th>
            <th style={{ padding: '10px 20px' }}>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {displayUsers.map(user => (
            <tr key={user.id}>
              <td style={{ padding: '8px 20px' }}>
                <Link to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </td>
              <td style={{ padding: '8px 20px' }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserView
