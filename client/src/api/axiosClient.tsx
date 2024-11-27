import { getLocalStorage } from '@/helpers/localStorage'
import axios, { InternalAxiosRequestConfig } from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000'
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