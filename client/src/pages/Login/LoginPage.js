import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { UserContext } from '../../context/UserContext'
import useLogin from '../../hooks/useLogin'

const LoginPage = () => {
  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = useLogin(username, password, setUser, queryClient, navigate)

  return (
    <div className="login-container">
      <div className="login-left">
        <div className='login-left-text'>
          <p>Every species in the world.</p>
          <p>All in one place.</p>
        </div>
      </div>
      <div className="login-right">
        <form onSubmit={login.mutate}>
          <div className="login-fields">
            {login.isError &&
              <div className="login-fields-error">
                <p>
                  {login.error.message}
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