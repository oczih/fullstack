import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogFOrm'

test('renders content', () => {
  const blog= {
    title: 'Component testing is done with react-testing-library'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
test('clicking the button reveals children', async () => {
    let container
    container = render(
        <Togglable buttonLabel="show...">
          <div className="testDiv" >
            togglable content
          </div>
        </Togglable>
      ).container

    const blog= {
        title: 'Component testing is done with react-testing-library',
        author: "Michael Smith",
        url: 'https://testing-library.com/docs/example-react',
        likes: 0
      }
    const div = container.querySelector('.togglableContent')
    const mockHandler = vi.fn()
      
    render(
      <Blog blog={blog} handleLikeChange={mockHandler} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
  
    expect(div).toHaveStyle('display: none')
    
  })


  describe('<Togglable />', () => {
    let container
  
    beforeEach(() => {
      container = render(
        <Togglable buttonLabel="show...">
          <div className="testDiv" >
            togglable content
          </div>
        </Togglable>
      ).container
    })
  
    test('renders its children', () => {
      screen.getByText('togglable content')
    })
  
    test('at start the children are not displayed', () => {
      const div = container.querySelector('.togglableContent')
      expect(div).toHaveStyle('display: none')
    })
  
    test('after clicking the button, children are displayed', async () => {
      const user = userEvent.setup()
      const button = screen.getByText('show...')
      await user.click(button)
  
      const div = container.querySelector('.togglableContent')
      expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed', async () => {
        const user = userEvent.setup()
    
        const button = screen.getByText('show...')
        await user.click(button)
    
        const closeButton = screen.getByText('cancel')
        await user.click(closeButton)
    
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
      })
  })

  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()
  
    render(<BlogForm createBlog={createBlog} />)
  
    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('save')
  
    await user.type(input, 'testing a form...')
    await user.click(sendButton)
  
    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
  })