import { getLocalStorage } from '@/helpers/localStorage'
import axios, { InternalAxiosRequestConfig } from 'axios'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = getLocalStorage('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

export default axiosClient;