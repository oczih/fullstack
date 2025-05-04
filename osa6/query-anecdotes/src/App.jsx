import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from './components/requests'
import { useNotificationDispatch } from './context/CounterContext'
import { useContext } from 'react'
const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const updateVoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a =>
        a.id === updatedAnecdote.id ? updatedAnecdote : a
      ))
    }
  })
  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({...anecdote, votes: anecdote.votes})

    dispatch({ type: 'showNotification', payload: `You voted: ${anecdote.content} !` })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
    
    console.log('vote')
  }

  /* const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ] */
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  if(result.isLoading) {
    return <div>loading data...</div>
  }
  if(result.isError){
    return <div>anecdote service is not available due to problems in</div>
  }
  const sort = (anecdotes) => {
    return [...anecdotes].sort((a, b) => b.votes - a.votes)
  }
  const anecdotes = result.data  
  const sortedAnecdotes = sort(anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {sortedAnecdotes.map(anecdote => {
        // Ensure that content is a valid string
        const content = typeof anecdote.content === 'object' ? anecdote.content.content : anecdote.content;

        return (
          <div key={anecdote.id}>
            <div>
              {content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App
