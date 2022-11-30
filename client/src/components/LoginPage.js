import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import userService from '../services/userService'
import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'

const LoginPage = () => {
  const { user, setUser } = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useMutation({
    mutationFn: async (event) => {
      event.preventDefault()
      return await userService.logIn({ username, password })
    },
    onSuccess: (data) => {
      setUser(data)
      window.localStorage.setItem('user', JSON.stringify(data))
    }
  })

  return (
    <div className="login-container">
      <div className="login-left">
        <div className='login-left-text'>
          <p>Every species in the world.</p>
          <p>All in one place.</p>
        </div>
      </div>
      <div className="login-right">
        <form onSubmit={mutation.mutate}>
          <div className="login-fields">
            {mutation.isError &&
              <div className="login-fields-error">
                <p>
                  {mutation.error.message}
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