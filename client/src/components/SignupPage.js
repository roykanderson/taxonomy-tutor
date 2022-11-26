import { useState } from "react"

import userService from "../services/userService"

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignup = async (event) => {
    event.preventDefault()
    console.log(username, password, confirmPassword)
    const response = await userService.signUp({ username, password })
    console.log(response)

    // REFACTOR TO USE REACT QUERY TO POST SIGNUPS/LOGINS
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
        <form onSubmit={handleSignup}>
          <div className="login-fields">
            {error &&
              <div className="login-fields-error">
                <p>
                  {errorMessage}
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
          <button className="login-submit" type="submit">Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage