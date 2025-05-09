import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5
  }

  render(<Blog blog={blog} />)
  expect(screen.getByText(/Test Blog Title/)).toBeDefined()

  expect(screen.getByText(/Test Author/)).toBeDefined()
  expect(screen.queryByText('http://example.com')).toBeNull()
  expect(screen.getByText(/likes/i)).toBeDefined()

})
test('likes and testuser should be revealed', async () => {
  const blog = {
    title: 'Another Blog',
    author: 'Jane Doe',
    url: 'http://another.com',
    likes: 12,
    user: {
      name: 'Test User'
    }
  }

  render(<Blog blog ={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText(/http:\/\/another\.com/)).toBeDefined()

  expect(screen.getByText(/likes/i)).toBeDefined()

  expect(screen.getByText(/Test User/)).toBeDefined()
})


test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Likeable Blog',
    author: 'Author',
    url: 'http://like.com',
    likes: 0
  }

  const mockLikeHandler = vi.fn()

  render(<Blog blog={blog} handleLikeChange={mockLikeHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const blog = {

  }
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title:')
  const authorInput = screen.getByPlaceholderText('author:')
  const urlInput = screen.getByPlaceholderText('url:')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing a form...')
  await user.type(authorInput, 'testing a form...')
  await user.type(urlInput, 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form...')
})