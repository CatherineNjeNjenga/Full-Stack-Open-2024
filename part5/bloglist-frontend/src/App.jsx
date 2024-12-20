import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

      if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      }
    }
    fetchData()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      console.log(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleLogout = (event) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    setErrorMessage(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
    const response = await blogService.create(blogObject)
    console.log(response)
  }

  const Notification = ( {message} ) => {
    if (message === null) {
      return null
    } else {
      return (
        <div className='error'>
          {message}
        </div>
      )
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            type="text" 
            name="Username" 
            value={username}
            onChange={({ target }) => setUsername(target.value)} 
          />
        </div>
        <div>
          password
          <input 
            type="password" 
            name="Password" 
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input 
            type="text" 
            name="title" 
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input 
            type="text" 
            name="author" 
            value={author} 
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input 
            type="text" 
            name="url" 
            value={url} 
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
      <div>
        {blogs.map((blog) => 
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage}/>
      <h2>blogs</h2>
      {user === null ?
      loginForm() : 
      <div>
        <p>{user.name} logged-in</p>
        <button type='submit' onClick={handleLogout}>logout</button>
        { blogForm()}
      </div>
     }
    </div>
  )
}

export default App
