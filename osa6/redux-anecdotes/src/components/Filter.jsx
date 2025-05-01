import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
    console.log(event.target.value)
  }

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  )
}

export default Filter