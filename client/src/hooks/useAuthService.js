import useAuth from "./useAuth"
import useAxios from "./useAxios"

const useAuthService = () => {
    const axios = useAxios()
    const { setAuth } = useAuth()

    const login = async (login, password) => {
        try {
            const res = await axios.post('/auth/login', { login, password })
            return res.data
        } catch (error) {
            if (error.response) {
                throw error
            } else {
                console.log(error)
            }
        }
    }
    
    const register = async (name, login, password) => {
        try {
            const response = await axios.post('/auth/register', { name, login, password })
            return response.data
        } catch (error) { 
            if (error.response) {
                throw error
            } else {
                console.log(error)
            }
        }
    }

    const logout = async () => {
        setAuth(null)
        return axios.patch('/auth/logout')
    }

    const checkLogin = async (possibleLogin) => {
        try {
            const response = await axios.post('/auth/checklogin', { possibleLogin })
            return response.data.isLoginAvailable
        } catch (error) {
            if (error.response) {
                throw error
            } else {
                console.log(error)
            }
        }
        
    }

    return { login, register, logout, checkLogin }
}

export default useAuthService