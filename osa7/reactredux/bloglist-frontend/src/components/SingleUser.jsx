import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const SingleUser = () => {
  const displayUsers = useSelector(state => state.users)
  const id = useParams().id
  const user = displayUsers.find(n => n.id === String(id))
  console.log(user)
  if (!user) {
    return null
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
      <h2>{user.name}</h2>
      <h4>Added blogs:</h4>
      <ul>
        {user.blogs.map(blog => (
          <p key={blog.id}>{blog.title}</p>
        ))}
      </ul>
    </div>
  )
}

export default SingleUser