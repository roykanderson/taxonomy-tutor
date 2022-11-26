import { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = (event) => {
    event.preventDefault()
    console.log(username, password)
    // TODO MORE HERE CONNECTING LOGIN TO BACKEND
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className='login-left-text'>
          <p>Every species in the world.</p>
          <p>All in one place.</p>
        </div>
      </div>
      <div className="login-right">
        <form onSubmit={handleLogin}>
          <div className="login-fields">
            {error &&
              <div className="login-fields-error">
                <p>
                  Incorrect username or password.
                </p>
                <p>
                  Don't have an account? <Link className='login-link' to='/signup'>Sign up</Link>.
                </p>
              </div>
            }
            <div className="login-fields-username">
              <input
                type="text"
                placeholder='Username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div className="login-fields-password">
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          </div>
          <button className="login-submit" type="submit">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage