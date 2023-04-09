import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { UserContext } from '../../context/UserContext'
import useLogin from '../../hooks/useLogin'

import styles from './Login.module.css'

const Login = () => {
  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = useLogin(username, password, setUser, queryClient, navigate)

  return (
    <div className={styles.Login}>
      <div className={styles.Login__display}>
        <div>
          <p>Every species in the world.</p>
          <p>All in one place.</p>
        </div>
      </div>
      <div className={styles.Login__container}>
        <form onSubmit={login.mutate}>
          <div className={styles.Login__card}>
            {login.isError &&
              <div className={styles.Login__error}>
                <p>
                  {login.error.message}
                </p>
                <p>
                  Don't have an account? <Link className={styles.Login__link} to='/signup'>Sign up</Link>.
                </p>
              </div>
            }
              <input
                className={`${styles.Login__input} ${styles['Login__input--marginBottom']}`}
                type="text"
                placeholder='Username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
              <input
                className={styles.Login__input}
                type="password"
                placeholder='Password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button className={styles.Login__submit} type="submit">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default Login