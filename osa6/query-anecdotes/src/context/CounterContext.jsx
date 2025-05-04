import { createContext, useReducer, useContext } from 'react'

export const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "showNotification":
        return action.payload
    case "hideNotification":
        return ''
    default:
        return state
  }
}

export const CounterContextProvider = (props) => {
  const [state, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[state, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}
