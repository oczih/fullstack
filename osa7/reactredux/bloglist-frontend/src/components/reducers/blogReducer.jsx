import { createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'



const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const id = action.payload.id
      const updatedBlog = action.payload
      return state.map(blog => (blog.id !== id ? blog : updatedBlog))
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlogs = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const addLikes = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(updateBlog(updatedBlog))
  }
}
export const deleteBlogs = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.error || 'Delete failed' }
    }
  }
}
export default blogSlice.reducer
