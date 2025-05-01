import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
  const dispatch = useDispatch()
  const { anecdotes, filter = '' } = useSelector(state => ({
    anecdotes: state.anecdotes,
    filter: state.filter
  }))

  
  const filteredAnecdotes = anecdotes
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)

  const handleVote = (id) => {
    const content = anecdotes.find(a => a.id === id)?.content || ''
    dispatch(vote(id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return (
    <div>
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
