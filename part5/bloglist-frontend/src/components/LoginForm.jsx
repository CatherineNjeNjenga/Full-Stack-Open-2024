const LoginForm = ({ 
  handleSubmit, 
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input 
            type="text" 
            name="Username" 
            value={username}
            onChange={handleUsernameChange} 
          />
        </div>
        <div>
          password
          <input 
            type="password" 
            name="Password" 
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm