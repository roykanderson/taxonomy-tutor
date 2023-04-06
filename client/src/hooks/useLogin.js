import { useMutation } from '@tanstack/react-query'

import userService from '../services/userService'

// useLogin accepts credentials for a user, then logs into that user's account.
// Upon success, the user's token will be set in localStorage and the application will navigate to the home page.

const useLogin = (username, password, setUser, queryClient, navigate) => {
  return useMutation({
    mutationFn: async (event) => {
      event.preventDefault()
      return await userService.logIn({ username, password })
    },
    onSuccess: (data) => {
      setUser(data)
      userService.setToken(data.token)
      window.localStorage.setItem('user', JSON.stringify(data))
      queryClient.invalidateQueries()
      navigate('/')
    }
  })
}

export default useLogin