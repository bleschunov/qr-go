import useAuth from "hooks/useAuth"
import { useState, useEffect } from "react"

const Protected = ({ children, role = 'user' }) => {
    const { auth } = useAuth()
    const [access, setAccess] = useState(false)

    // console.log(auth)

    useEffect(() => {
        setAccess(role === 'user' || auth.user.access === 'admin')
    }, [auth])

    return access ? children : <h1>У вас не хватает прав</h1>
}

export default Protected