import axios from 'axios'

const SIGNUP_URL = 'http://localhost:3001/api/users'
const LOGIN_URL = 'http://localhost:3001/api/login'

const signUp = async (credentials) => {
  try {
    const response = await axios.post(SIGNUP_URL, credentials)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

const logIn = async (credentials) => {
  try {
    const response = await axios.post(LOGIN_URL, credentials)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

const userService = {
  signUp,
  logIn
}

export default userService