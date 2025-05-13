import React, { useState } from 'react'
import PropTypes from 'prop-types'
import storage from '../services/users'
import { deleteBlogs, addLikes } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }


  const handleLike = () => {
    dispatch(addLikes(blog))
    dispatch(setNotification(`You added one like for "${blog.title}" !`, 5))
  }

  return (
    <div style={style} className='blog'>
      {blog.title} by {blog.author}
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          likes {blog.likes}
          <button
            style={{ marginLeft: 3 }}
            onClick={() => handleLike()}
          >
            like
          </button>
        </div>
        <div>{nameOfUser}</div>
        <button onClick={() => {
          console.log(blog.id)
          dispatch(deleteBlogs(blog.id))
          dispatch(setNotification(`Deleted "${blog.title}"`, 5))
        }}>
        remove
        </button>
      </div>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }).isRequired
}


export default Blog
