import { useSelector, useDispatch } from 'react-redux'


const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification) {
    return null
  }


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    maxWidth: 300,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
    textAlign: 'center'
  }

  return (
    <div style={style} className="alert alert-primary" role='alert'>
      {notification}
    </div>
  )
}

export default Notification