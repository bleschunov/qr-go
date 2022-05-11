import NotFoundError from '../errors/notFound.js'
import UnauthenticatedError from '../errors/unauthorized.js'
import User from '../models/User.js'
import Point from '../models/Point.js'
import bcrypt from 'bcrypt'
import usersRouter from '../routes/users.js'

const createUserController = (action) => async (req, res) => {
    const users = await action(req)
    if (!users) throw new NotFoundError(`Пользователь не найден`)

    let body
    if ( Array.isArray(users) ) body = users
    else body = [ users ]

    const response = {
        count: body.length,
        users: body.map(user => user.format())
    }

    res.status(200).json(response)
}

const getUsers = createUserController(
    (req) => {
        const { login } = req.query
        const query = {}

        if (login) {
            query.login = login
        }
        
        return User.find(query)
    }
)

const updateUser = createUserController(
    (req) => {
        delete req.body.password
        return User.findByIdAndUpdate(
            req.user.userId, 
            req.body, 
            { new: true, runValidators: true }
        )
    }
)

const deleteUser = createUserController(
    (req) => User.findByIdAndDelete(req.user.userId)
)

const changePassword = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    console.log(user)
    if (!user) throw new NotFoundError(`Пользователь не найден`)

    const isOldPasswordCorrect = await bcrypt.compare(req.body.oldPassword, user.password)
    if (!isOldPasswordCorrect) throw new UnauthenticatedError('Авторизуйтесь')

    const newPasswordHash = await bcrypt.hash(req.body.newPassword, 8)
    user.password = newPasswordHash
    user.save()
    res.sendStatus(200)
}

export {
    getUsers,
    updateUser,
    deleteUser,
    changePassword
}