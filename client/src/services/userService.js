import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api/users'

const signUp = async credentials => {
  const response = await axios.post(BASE_URL, credentials)
  return response.data
}

const userService = {
  signUp
}

export default userService