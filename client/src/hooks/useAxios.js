import useAuth from "./useAuth"
import axios from "http/axios"
import { useEffect } from "react"

const useAxios = () => {
    const { auth, setAuth } = useAuth()

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(config => {
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${auth?.jwt}`
            }
            return config
        })

        const responseInterceptor = axios.interceptors.response.use(config => {
            return config
        }, async error => {
            const prevRequest = error.config
            if (error?.response?.status === 401 && !prevRequest?.retry) {
                try {
                    prevRequest.retry = true
                    const response = await axios.get('auth/refresh', { retry: true })
                    setAuth({ user: response.data.users[0], jwt: response.data.jwt })
                    prevRequest.headers['Authorization'] = `Bearer ${response.data.jwt}`
                    return axios(prevRequest)
                } catch (error) {
                    console.log(error)
                    setAuth(null)
                }
            }
            return Promise.reject(error)
        })

        return () => {
            axios.interceptors.request.eject(requestInterceptor)
            axios.interceptors.request.eject(responseInterceptor)
        }
    }, [auth])

    return axios
}

export default useAxios