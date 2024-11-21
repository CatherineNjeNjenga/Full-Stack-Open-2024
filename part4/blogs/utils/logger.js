const info = (...props) => {
  if (process.env !== 'test') {
    console.log(...props)
  }
}

const error = (...props) => {
  if (process.env !== 'test') {
    console.error(...props)
  }
}

module.exports = {
  info, error
}