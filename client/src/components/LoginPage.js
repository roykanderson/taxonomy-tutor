import { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(true)

  return (
    <div className="login-container">
      <div className="login-left">
        <div className='login-left-text'>
          <p>Every species in the world.</p>
          <p>All in one place.</p>
        </div>
      </div>
      <div className="login-right">
        <form>
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
              <input type="text" placeholder='Username' />
            </div>
            <div className="login-fields-password">
              <input type="password" placeholder='Password' />
            </div>
          </div>
          <button className="login-submit" type="submit">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage