import { createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    appendComment(state, action) {
      state.push(action.payload)
    },
    setComments(state, action) {
      return action.payload
    },
  }
})

export const { appendComment, setComments } = commentSlice.actions

export const createComment = (comment, blogId) => {
  return async dispatch => {
    try {
      const newComment = await blogService.postComment(comment, blogId)
      console.log('newComment', newComment)
      dispatch(appendComment(newComment))
    } catch (error) {
      console.error('Failed to create comment:', error)
    }
  }
}

export default commentSlice.reducer
