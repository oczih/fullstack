import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './components/reducers/notificationReducer'
import blogReducer from './components/reducers/blogReducer'
import userReducer from './components/reducers/userReducer'
import loginReducer from './components/reducers/loginReducer'
import commentsReducer from './components/reducers/commentsReducer'


const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
    authUser: loginReducer,
    comments: commentsReducer
  },
})

export default store
