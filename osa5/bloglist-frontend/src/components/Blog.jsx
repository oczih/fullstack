import Togglable from './Togglable'

const Blog = ({ blog, handleLikeChange, handleBlogDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div className='blog' style={blogStyle}>
      <div>{blog.title} {blog.author}<br/></div>
      <div>
        <Togglable buttonLabel='view'>
          {blog.url}<br/>
          {blog.likes} likes <button onClick={handleLikeChange}>like</button><br/>
          {blog.user ? blog.user.name : ''}<br/>
          <button onClick={handleBlogDelete}>remove</button>
        </Togglable>
      </div>

    </div>
  )
}

export default Blog