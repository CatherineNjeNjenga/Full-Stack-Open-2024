import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [blogs])

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

  const blogFormRef = useRef()

  const handleCreate = async (blogObject, title, author) => {
    setErrorMessage(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    console.log(response)
  }

  const addLikes = async (updatedBlog, id) => {
    const response = await blogService.update(updatedBlog, id)
    console.log(response)
    const blogId = response.id
    console.log((blogs.map(blog => blog.id === id ? response : blog)).sort((a, b) => console.log(a.likes > b.likes)))
    setBlogs(blogs.map(blog => blog.id === id ? response : blog))
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

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm 
        createBlog={handleCreate}
      />
    </Togglable>
  )

  return (
    <div>
      <Notification message={errorMessage}/>
      <h2>blogs</h2>
      {user === null ?
      <Togglable buttonLabel='login'>
        <LoginForm 
          handleSubmit={handleLogin} 
          username={username} 
          password={password} 
          handleUsernameChange={({ target }) => setUsername(target.value)} 
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </Togglable>: 
      <div>
        <p>{user.name} logged-in</p>
        <button type='submit' onClick={handleLogout}>logout</button>
        { blogForm()}
      </div>
     }
     <div>
        {blogs.map((blog) => 
          <Blog key={blog.id} blog={blog} addLikes={addLikes} user={user} />
        )}
      </div>
    </div>
  )
}

export default App
