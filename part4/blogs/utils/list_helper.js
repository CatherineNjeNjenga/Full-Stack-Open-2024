const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  const maxLikes = blogs.reduce((previous, blog) => Math.max(previous, blog.likes), 0)
  console.log(maxLikes)
  const favOne = blogs.find(blog => blog.likes === maxLikes)
  console.log(favOne)
  return blogs.length === 0
    ? 0
    : favOne
}

const mostBlogs = (blogs) => {
  // const mostBlog = {}
  const findBlog = blogs.reduce((mostBlog, blog) => {
    const value = blog.author
    const count = 0
    if(!mostBlog.author) {
      mostBlog.author
    } else if (mostBlog === blog.author) {
      count += 1
      mostBlog.author = count
    }
  }, {})
}

const mostLikes = (blogs) => {
  const maxLikes = blogs.reduce((previous, blog) => Math.max(previous, blog.likes), 0)
  console.log(maxLikes)
  const favOne = blogs.find(blog => blog.likes === maxLikes)
  const mostLike = {}
  mostLike.author = favOne.author
  mostLike.likes = favOne.likes
  console.log(mostLike)
  return blogs.length === 0
    ? 0
    : favOne
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}