import React, { useState } from 'react'
import { showNotification, clearNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import { createBlogs } from './reducers/blogReducer'
const NewBlogForm = () => {
  const dispatch = useDispatch()

  const onCreate = (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const url = event.target.url.value
    const author = event.target.author.value
    if (title === '' || url === '' || author === '') {
      return null
    }
    event.target.title.value = ''
    event.target.url.value = ''
    event.target.author.value = ''
    const newBlog = {
      title: title,
      url: url,
      author: author,
    }
    dispatch(createBlogs(newBlog))
    dispatch(showNotification(`blog ${title} added`, 5))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div className="container d-flex flex-column align-items-center mb-4">
      <h2>Create a New Blog</h2>
      <form onSubmit={onCreate} className="w-50">
        <div className="form-group mb-3">
          <label htmlFor="title">Title:</label>
          <input name="title" id="title" className="form-control form-control-sm" />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="url">URL:</label>
          <input name="url" id="url" className="form-control form-control-sm" />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="author">Author:</label>
          <input name="author" id="author" className="form-control form-control-sm" />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Create
          </button>
        </div>
      </form>
    </div>
  )


}

export default NewBlogForm