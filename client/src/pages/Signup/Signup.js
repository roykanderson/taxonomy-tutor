import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import LoadingIcon from "../../components/LoadingIcon"
import useSignUp from '../../hooks/useSignup'

import styles from './Signup.module.css'

const Signup = () => {
  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const signUp = useSignUp(username, password, confirmPassword, setUser, queryClient, navigate)

  return (
    <div className={styles.Signup}>
      <div className={styles.Signup__display}>
        <div>
          <p>Study every species in the world, all in one place.</p>
        </div>
      </div>
      <div className={styles.Signup__container}>
        <form className={styles.Signup__form} onSubmit={signUp.mutate}>
          <div className={styles.Signup__card}>
            {signUp.isError &&
              <div className={styles.Signup__error}>
                {signUp.error.message}
              </div>
            }
            <input
              className={`${styles.Signup__input} ${styles['Signup__input--marginBottom']}`}
              type="text"
              placeholder='Username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              className={`${styles.Signup__input} ${styles['Signup__input--marginBottom']}`}
              type="password"
              placeholder='Password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <input
              className={styles.Signup__input}
              type="password"
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
          </div>
          <button className={styles.Signup__submit} type="submit">
            {signUp.isLoading ? <LoadingIcon /> : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup