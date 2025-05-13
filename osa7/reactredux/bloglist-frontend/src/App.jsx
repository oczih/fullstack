import { useState, useEffect, useRef } from 'react'

import {
  Routes,
  Route,
  Link,

} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/LoginForm'
import NewBlogForm from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification, clearNotification } from './components/reducers/notificationReducer'
import { initializeBlogs } from './components/reducers/blogReducer'
import { initializeUser } from './components/reducers/loginReducer'
import { initializeAllUsers } from './components/reducers/userReducer'
import { logout } from './components/reducers/loginReducer'
import BlogList from './components/BlogLista'
import UserView from './components/UserView'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import Footer from './components/Footer'
const Blogs = () => {
  return (
    <div>
      <BlogList />
    </div>
  )
}
const Home = () => {
  const blogFormRef = useRef()
  return (
    <div className="container mt-4">
      <div className="d-flex flex-column align-items-center mb-4">
        <Togglable buttonLabel="create new blog" ref={blogFormRef} className="btn btn-success">
          <NewBlogForm />
        </Togglable>
      </div>
      <BlogList />
    </div>
  )
}
const App = () => {
  const dispatch = useDispatch()
  const authUsers = useSelector(state => state.authUser)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUsers())
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    dispatch(setNotification('Logged out successfully', 5))
  }
  const style = {
    padding: 5,
  }
  return (
    <div>
      <h1 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '1rem', marginBottom: '2rem', marginTop: '2rem' }}>Blog App</h1>
      <Notification />
      {authUsers ? (
        <>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <Link className="btn btn-outline-primary" to="/">home</Link>
            <Link className="btn btn-outline-primary" to="/blogs">blogs</Link>
            <Link className="btn btn-outline-primary" to="/users">users</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
            <div>{authUsers.name} logged in</div>
            <button onClick={handleLogout} className="btn btn-outline-danger" style={{ marginTop: '1rem', width: 'fit-content' }}>
            logout
            </button>
          </div>
          <Routes>
            <Route path="/users" element={<UserView />} />
            <Route path="/" element={<Home />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/users/:id' element={<SingleUser />} />
            <Route path='/blogs/:id' element={<SingleBlog />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
      <Footer />
    </div>
  )
}
export default App