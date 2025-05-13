import { set } from 'mongoose'
import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate, useParams
} from 'react-router-dom'
import  { useField } from './hooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link href='#' style={padding} to="/">anecdotes</Link>
      <Link href='#' style={padding} to="createnew">create new</Link>
      <Link href='#' style={padding} to="about">about</Link>
    </div>
  )
}
const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  if (!anecdote) return <div>Anecdote not found</div>
  return (<div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see: <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>)
}
const AnecdoteList = ({ anecdotes }) => {
  console.log(anecdotes.map(anecdote => anecdote.id))
  
  return (
    <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </td>
            <td>
              {anecdote.author}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)
const Notification = ({ message }) => {
  if (!message) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}
const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const [message, setMessage] = useState(null)
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setMessage(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
    <div className='container'>
      {(message &&
      <Alert variant="success">
        {message}
      </Alert>
    )}
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/>}/>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/createnew" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <Footer />
    </div>
    </Router>
  )
}

export default App
