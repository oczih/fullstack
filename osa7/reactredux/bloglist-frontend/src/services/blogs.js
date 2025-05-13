import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getComment = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments` )
  console.log(response.data)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const postComment = async ({ blogId, content }) => {
  const commentObject = { content }

  // Ensure you are passing a valid blogId (as string) to the URL
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentObject)  // Use blogId as part of the URL
  return response.data
}


export default { getAll, create, setToken, update, remove, getComment, postComment }