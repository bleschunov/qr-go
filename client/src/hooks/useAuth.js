import { authContext } from "hoc/AuthProvider"
import { useContext } from "react"

const useAuth = () => {
    return useContext(authContext)
}

export default useAuth