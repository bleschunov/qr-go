import {
    getUsers,
    updateUser,
    deleteUser,
    changePassword
} from '../controllers/users.js'

import authMiddleware from '../middleware/auth.js'

import { Router } from 'express'
const usersRouter = Router()


usersRouter.patch('/changepassword', changePassword)

usersRouter.route('/')
    .get(getUsers)
    .patch(authMiddleware, updateUser)
    .delete(authMiddleware, deleteUser)

export default usersRouter