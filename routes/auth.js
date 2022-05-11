import { 
    login, 
    logout, 
    register, 
    refresh, 
    isLoginAvailable,
} from '../controllers/auth.js'

import { Router } from 'express'
const authRouter = Router()

authRouter.post('/login', login)
authRouter.patch('/logout', logout)
authRouter.post('/register', register)
authRouter.get('/refresh', refresh)
authRouter.post('/checklogin', isLoginAvailable)

export default authRouter