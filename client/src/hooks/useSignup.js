import { useMutation } from '@tanstack/react-query'

import userService from '../services/userService'

// useSignup accepts credentials for a new user, then creates a new user account.
// Upon success, the new user will be signed in and the application will navigate to the home page.

const useSignup = (username, password, confirmPassword, setUser, navigate) => {
  return useMutation({
    mutationFn: async (event) => {
      event.preventDefault()
      return await userService.signUp({ username, password, confirmPassword })
    },
    onSuccess: (data) => {
      setUser(data)
      window.localStorage.setItem('user', JSON.stringify(data))
      navigate('/')
    }
  })
}

export default useSignup