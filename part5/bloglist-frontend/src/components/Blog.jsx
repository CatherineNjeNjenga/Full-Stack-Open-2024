import { useState } from "react"

const Blog = ({ blog, addLikes, user, removeBlog }) => {
    const [showBlog, setShowBlog] = useState(false)
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
      listStyleType: 'none' 
    }

    const handleShowBlog = ({ target }) => {
      setShowBlog(!showBlog)

      if (showBlog) {
        target.textContent = 'hide'
      } else if (!showBlog){
        target.textContent = 'view'
      }
    }

    const handleLike = () => {
      let currentLikes = blog.likes
      let updatedLikes = currentLikes += 1
      const blogId = blog.id
      const updatedBlog = {...blog, likes: updatedLikes}
      addLikes(updatedBlog, blogId)
      blog.likes = updatedBlog.likes
      console.log(blog.likes)
      console.log(user)
    }

    const handleRemove = () => {
      const blogObject = blog
      const blogId = blog.id
      removeBlog(blogObject, blogId)
    }

    return (
      <>
        {showBlog ?
        <>
          <ul>
            <li style={blogStyle}>{blog.title}</li>
            <button onClick={handleShowBlog}>hide</button>
            <li style={blogStyle}>{blog.author}</li> 
            <li style={blogStyle}>{blog.url}</li> 
            <li style={blogStyle}>likes {blog.likes}<button onClick={handleLike}>like</button></li>
            <li style={blogStyle}>{user.name}</li> 
          </ul>
          <button onClick={handleRemove}>remove</button>
        </> :
        <>
          <ul >
            <li style={blogStyle}>{blog.title}</li>
            <button onClick={handleShowBlog}>view</button>
          </ul>
        </>}
      </>
    )
}

export default Blog

