import axios from 'axios'

const token = localStorage.getItem('token')

const axiosInstance = axios.create({
  baseURL: 'http://5.34.201.164:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  },
})

export default axiosInstance
