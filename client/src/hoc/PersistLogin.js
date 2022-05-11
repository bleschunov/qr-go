import useAuth from "hooks/useAuth"
import useAxios from "hooks/useAxios"
import { Outlet, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const PersistLogin = () => {
  const { setAuth } = useAuth() 
  const axios = useAxios()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fn = async () => {
      try {
        const response = await axios.get(
          `auth/refresh`, 
          { retry: true }
        )

        const user = response.data.users[0]
        const accessToken = response.data.jwt
        const imageResponse = await axios.get(
          `images/${user.thumbnail}`, 
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            responseType: 'blob', 
          }
        )
        const ava = URL.createObjectURL(imageResponse.data)

        setAuth({ user: { ...user, ava }, jwt: response.data.jwt, })

      } catch (error) {
        navigate('/login', { replace: true })
      } finally {
        setLoading(false)
      }
    }
  
    fn()
  }, [])

  return loading ? <h1>Загрузка</h1> : <Outlet />
}

export default PersistLogin