import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import Notification from './Notification'
const LoginForm = () => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    const user = await dispatch(login(username, password))
    if (user) {
      dispatch(initializeBlogs())
    } else {
      setNotification('Wrong username or password')
      setTimeout(() => clearNotification(null), 5000)
    }
  }


  return (
    <div className="container mt-5">
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <h2 className="mb-4 text-center">Login</h2>

        <div className="form-group mb-3">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            className="form-control"
            placeholder='Enter your username'
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            placeholder='Enter your password'
          />
        </div>

        <div className="text-center">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default LoginForm