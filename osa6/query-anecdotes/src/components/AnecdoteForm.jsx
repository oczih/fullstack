import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from "./requests"
import { useNotificationDispatch,  } from '../context/CounterContext'


const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () => {
        dispatch({ type: 'showNotification', payload: `Anecdote must be at least 5 characters long!` })
        setTimeout(() => {
          dispatch({ type: 'hideNotification' })
        }, 5000)
    }
  })
  
const onCreate = (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  newAnecdoteMutation.mutate(content)
  dispatch({ type: 'showNotification', payload: `You created: ${content} !` })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
  console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
