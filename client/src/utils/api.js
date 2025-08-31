import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor to add auth token if needed
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (user.token) {
            config.headers.Authorization = `Bearer ${user.token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export const vendorAPI = {
    getVendors: (page = 1, limit = 10) =>
        api.get(`/vendors?page=${page}&limit=${limit}`),

    getVendor: (id) =>
        api.get(`/vendors/${id}`),

    createVendor: (data) =>
        api.post('/vendors', data),

    updateVendor: (id, data) =>
        api.put(`/vendors/${id}`, data),

    deleteVendor: (id) =>
        api.delete(`/vendors/${id}`)
}

export default api