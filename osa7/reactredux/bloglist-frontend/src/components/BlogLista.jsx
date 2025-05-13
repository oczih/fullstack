import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { deleteBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => {
    const blogList = state.blogs || []
    return blogList.slice().sort((a, b) => b.likes - a.likes)
  })

  const handleDelete = async (blog) => {
    const result = await dispatch(deleteBlogs(blog.id))

    if (result.success) {
      dispatch(setNotification(`Deleted "${blog.title}"`, 5))
    } else {
      dispatch(setNotification(`Failed to delete "${blog.title}": ${result.message}`, 5))
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Blogs</h2>
      <ListGroup>
        {blogs.map(blog => (
          <ListGroup.Item
            key={blog.id}
            className="d-flex justify-content-between align-items-center"
          >
            <Link to={`/blogs/${blog.id}`} className="text-decoration-none flex-grow-1">
              <strong>{blog.title}</strong> by {blog.author}
            </Link>
            <span className="badge bg-primary rounded-pill">{blog.likes} likes</span>
            <button
              className="btn btn-outline-danger btn-sm ms-2"
              onClick={() => handleDelete(blog)}
            >
              Delete
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default BlogList
