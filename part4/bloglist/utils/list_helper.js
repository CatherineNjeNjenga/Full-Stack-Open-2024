const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  const maxLikes = blogs.reduce((previous, blog) => Math.max(previous, blog.likes), 0)
  const favOne = blogs.find(blog => blog.likes === maxLikes)
  return blogs.length === 0
    ? 0
    : favOne
}

const mostBlogs = (blogs) => {
  // const all = blogs.map(blog => {
  //   return  blog = {author:blog.author, blog: count}
  // })
  const grouped = _.groupBy(blogs, 'author')
  let maxLen = Math.max(...(_.map(grouped, group => group.length)))
  const filtGroup = _.filter(grouped, group => group.length === maxLen)
  if (filtGroup.length !== 0) {
    const mostBlog = {
      author: filtGroup[0][0].author,
      blogs: maxLen
    }
    return mostBlog
  } else {
    return 0
  }
}

const mostLikes = (blogs) => {
  const groupedByAut = _.groupBy(blogs, 'author')
  const allBlogs = _.forEach(groupedByAut, group => _.forEach(group))
  const authArr = (Object.keys(allBlogs))
  let likesArr = []
  for (let blogValues of Object.values(allBlogs)) {
    const totalLikes = blogValues.reduce((sum, blog) => sum + blog.likes, 0)
    likesArr = likesArr.concat(totalLikes)
  }
  const maxLikes = Math.max(...likesArr)
  const blogInd = likesArr.indexOf(maxLikes)
  const mostLike = {
    author: authArr[blogInd],
    likes: maxLikes
  } 

  return blogs.length === 0
    ? 0
    : mostLike
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}