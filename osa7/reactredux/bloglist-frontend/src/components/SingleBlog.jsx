import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addLikes } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { createComment } from './reducers/commentsReducer'

const SingleBlog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)
  const comments = useSelector(state => state.comments)
  console.log('comments', comments)
  const blogComments = comments.filter(comment => comment.blogs === id)
  console.log('comment', blogComments)
  const [commentContent, setCommentContent] = useState('')

  if (!blog) {
    return <p>Blog not found or still loading...</p>
  }


  const handleLike = () => {
    dispatch(addLikes(blog))
    dispatch(setNotification(`You added one like for "${blog.title}" !`, 5))
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    if (commentContent.trim()) {
      dispatch(createComment({ blogId: blog.id, content: commentContent }))
      dispatch(setNotification(`You added a comment for "${blog.title}" !`, 5))
      setCommentContent('')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '1rem' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>{blog.title}</h1>
      <p style={{ marginBottom: '0.5rem' }}><strong>Author:</strong> {blog.author}</p>
      <p style={{ marginBottom: '0.5rem' }}><a href={blog.url}>{blog.url}</a></p>
      <p style={{ marginBottom: '0.5rem' }}><strong>{blog.likes} likes</strong></p>
      <button style={{ marginBottom: '0.5rem', width: 'fit-content' }} onClick={handleLike}>like</button>
      <p><strong>Added by:</strong> {blog.user?.name || 'anonymous'}</p>

      <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add a comment"
          style={{ marginBottom: '0.5rem' }}
        />
        <button type="submit" style={{ width: 'fit-content' }} className="btn btn-outline-success">Add Comment</button>
        <div className="container pb-5">
          {blogComments.map((comment) => (
            <div className="shadow-lg p-3 bg-body rounded mt-4" key={comment.id}>
              <div className="card-body">
                <p className="card-text">{comment.content}</p>
              </div>
            </div>
          ))}</div>
      </form>
    </div>
  )
}

export default SingleBlog
