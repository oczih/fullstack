import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filters }) => {
    const allAnecdotes = anecdotes || []
    const filter = filters || ''

    const anecdotesToShow = allAnecdotes
      .filter(a => a.content && a.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)

    return anecdotesToShow
  })

  const allAnecdotes = useSelector(state => state.anecdotes || [])

  const handleVote = (id) => {
    dispatch(addVote({ id }))
    const content = allAnecdotes.find(a => a.id === id)?.content || ''
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
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
