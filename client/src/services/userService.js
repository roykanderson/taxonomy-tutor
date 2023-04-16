import axios from 'axios'

const SIGNUP_URL = '/api/users'
const LOGIN_URL = '/api/login'
const SETS_URL = '/api/sets'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const signUp = async (credentials) => {
  try {
    const response = await axios.post(SIGNUP_URL, credentials)
    setToken(response.data.token)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

const logIn = async (credentials) => {
  try {
    const response = await axios.post(LOGIN_URL, credentials)
    setToken(response.data.token)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

const logOut = async () => {
  setToken(null)
}

const getSet = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {
    const config = {
      headers: { Authorization: `bearer ${user.token}` }
    }
    const response = await axios.get(`${SETS_URL}/${id}`, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}


const getSets = async () => {
  try {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.get(SETS_URL, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

const createSet = async (name, taxonIds) => {
  try {
    const config = {
      headers: { Authorization: token }
    }

    const set = { name: name, taxonIds: taxonIds }

    const response = await axios.post(SETS_URL, set, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
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
    throw new Error(error.response.data.error)
  }
}

const deleteSet = async (id) => {
  try {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.delete(`${SETS_URL}/${id}`, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const userService = {
  setToken,
  signUp,
  logIn,
  logOut,
  getSet,
  getSets,
  createSet,
  updateSet,
  deleteSet
}

export default userService