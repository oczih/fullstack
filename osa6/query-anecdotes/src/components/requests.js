import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes= () =>
  axios.get(baseURL).then(res => res.data)

export const createAnecdote = content => 
  axios.post(baseURL, {content, votes: 0}).then(res => res.data)


export const voteAnecdote = (anecdote) => 
    axios.put(`${baseURL}/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1}).then(res => res.data)
    