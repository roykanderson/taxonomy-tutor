import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import LoadingIcon from "../../components/LoadingIcon"
import useSignUp from '../../hooks/useSignup'

const Signup = () => {
  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const signUp = useSignUp(username, password, confirmPassword, setUser, queryClient, navigate)

  return (
    <div className="login-container">
      <div className="login-left">
        <div className='login-left-text'>
          <p>Every species in the world.</p>
          <p>All in one place.</p>
        </div>
      </div>
      <div className="login-right">
        <form onSubmit={signUp.mutate}>
          <div className="login-fields">
            {signUp.isError &&
              <div className="login-fields-error">
                <p>
                  {signUp.error.message}
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
            <div className="login-fields-password">
              <input
                type="password"
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
              />
            </div>
          </div>
          <button className="login-submit" type="submit">
            {signUp.isLoading ? <LoadingIcon /> : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup