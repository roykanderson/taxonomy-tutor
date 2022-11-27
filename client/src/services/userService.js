import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api/users'

const signUp = async credentials => {
  try {
    const response = await axios.post(BASE_URL, credentials)
    return response.data
  } catch(error) {
    throw new Error(error.response.data.message)
  }
}

const userService = {
  signUp
}

export default userService