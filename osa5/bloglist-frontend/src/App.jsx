import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import PropTypes from 'prop-types'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const handleLikeChange = id => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null
    }
    blogService
      .update(id.trim(), changedBlog)
      .then(returnedBlog => {
        const updatedBlog = {
          ...returnedBlog,
          user: blog.user
        }
        setBlogs(blogs.map(b => (b.id !== id ? b : updatedBlog)))
      })
      .catch(error => {
        setErrorMessage(`Blog ${blog.title} couldn't be updated`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  const handleBlogDelete = id => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
        })
        .catch(error => {
          setErrorMessage(`Blog ${blog.title} couldn't be removed`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage}/>
        <Togglable buttonLabel='show login'>
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}>
            <button type="submit">login</button>
          </LoginForm>
        </Togglable>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}/>
      <p>{user.name} logged in</p><button onClick={() => {window.localStorage.clear()
        setUser(null)}
      }>logout</button>
      <Togglable buttonLabel='new blog'>
        <BlogForm
          createBlog={addBlog}
        /></Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog}
          handleLikeChange={() => handleLikeChange(blog.id)} handleBlogDelete={() => handleBlogDelete(blog.id)} />
      )}
      <Footer />
    </div>
  )
}

export default App