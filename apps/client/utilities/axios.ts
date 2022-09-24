import axios from 'axios'
import { apiUrl } from './apiUrl'
import { sessionId } from './sessionId'

export default axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    Authorization: 'sessionId ' + sessionId,
  },
})
