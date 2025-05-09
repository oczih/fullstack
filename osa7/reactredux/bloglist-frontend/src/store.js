import notificationReducer from './components/reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})

export default store
