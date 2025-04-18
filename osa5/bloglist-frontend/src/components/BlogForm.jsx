import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
            title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id='title-input'
        /><br />
          author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id='author-input'
        /><br />
          url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          id='url-input'
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
