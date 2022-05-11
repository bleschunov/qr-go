import { useState, createContext, useEffect } from "react";

const authContext = createContext({})

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)

    useEffect(() => {
        setAuth(prev => ({ ...prev }))
    }, [])

    return <authContext.Provider value={{ auth, setAuth }}>{children}</authContext.Provider>
}

export { authContext } 

export default AuthProvider