import axios from 'axios'

const SIGNUP_URL = 'http://localhost:3001/api/users'
const LOGIN_URL = 'http://localhost:3001/api/login'
const SETS_URL = 'http://localhost:3001/api/sets'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

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

const createSet = async (name) => {
  try {
    const config = {
      headers: { Authorization: token }
    }

    const set = { name: name, taxonIds: [] }

    const response = await axios.post(SETS_URL, set, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data)
  }
}

const updateSet = async (id, name, taxonIds) => {
  try {
    const config = {
      headers: { Authorization: token }
    }

    const body = { name, taxonIds }

    const response = await axios.put(`${SETS_URL}/${id}`, body, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data)
  }
}

const userService = {
  setToken,
  signUp,
  logIn,
  createSet,
  updateSet
}

export default userService