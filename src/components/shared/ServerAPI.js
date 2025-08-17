import axios from "axios";
import { toast } from "react-toastify";

const ServerAPI = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

ServerAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.token = token;
    }
    return config
},
    (error) => {
        return Promise.reject(error)
    }
)
ServerAPI.interceptors.response.use((response) => {
    return response
},
    (error) => {
        if (error.response) {
            const status = error.response.status
            const message = error.response.data?.message || 'Something is wrong'
            switch (status) {
                case 401:
                    toast.error('Session expired. Please login again.')
                    localStorage.removeItem('token')
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 3000)
                    break;
                case 403:
                    toast.error('You don\'t have permission to do this.');
                    break;
                case 404:
                    toast.error('Resource not found.');
                    break;
                case 500:
                    toast.error('Server error. Please try again later.');
                    break;
                default:
                    toast.error(message);
            }
        } else if (error.request) {
            // Network error
            toast.error('Network error. Please check your connection.');
        } else {
            // Other error
            toast.error('An unexpected error occurred.');
        }
        return Promise.reject(error)
    }
)

export default ServerAPI;