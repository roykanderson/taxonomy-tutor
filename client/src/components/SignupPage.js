import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import userService from "../services/userService"
import LoadingIcon from "./LoadingIcon"

const SignupPage = () => {
  const { setUser } = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const mutation = useMutation({
    mutationFn: async (event) => {
      event.preventDefault()
      return await userService.signUp({ username, password, confirmPassword })
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
            {mutation.isLoading ? <LoadingIcon /> : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage