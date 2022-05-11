import User from "../models/User.js"

import UnauthenticatedError from '../errors/unauthorized.js'
import BadRequestError from '../errors/badRequest.js'

import bcrypt from 'bcrypt'

const login = async (req, res) => {
    const { login: queryLogin, password: queryPassword } = req.body
    if (!queryLogin || !queryPassword) throw new BadRequestError('Логин и пароль обязательны')

    const user = await User.findOne({ login: queryLogin })
    if (!user) throw new UnauthenticatedError(`Пользователь с логином ${queryLogin} не найден`)

    const isPasswordCorrect = await bcrypt.compare(queryPassword, user.password)
    if (!isPasswordCorrect) throw new UnauthenticatedError(`Неправильный пароль`)

    const accessToken = user.getAccessToken()
    const refreshToken = user.getRefreshToken()

    user.refreshToken = refreshToken
    await user.save()

    res.cookie('jwt', refreshToken, {sameSite: 'None', secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000})

    res.status(200).json({ count: 1, users: [user.format()], jwt: accessToken })
}

const logout = async (req, res) => {
    const { jwt } = req.cookies
    if (!jwt) throw new UnauthenticatedError('Авторизуйтесь')

    const user = await User.findOneAndUpdate({ refreshToken: jwt }, { refreshToken: null }, {new: true})
    if (!user) throw new UnauthenticatedError('Авторизуйтесь')
    console.log(user)

    res.status(200).json(jwt)
}

const register = async (req, res) => {
    const { name, login, password } = req.body
    if (!name || !login || !password) new BadRequestError('Имя, логин и пароль обязательны')

    const hashedPassword = await bcrypt.hash(req.body.password, 8)
    const user = await User.create({ ...req.body, password: hashedPassword })

    const accessToken = user.getAccessToken()
    const refreshToken = user.getRefreshToken()

    user.refreshToken = refreshToken
    await user.save()

    res.cookie('jwt', refreshToken, {sameSite: 'None', secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000})

    res.status(200).json({ count: 1, users: [user.format()], jwt: accessToken })
}

const refresh = async (req, res) => {
    const { jwt } = req.cookies
    if (!jwt) throw new UnauthenticatedError('Авторизуйтесь')

    const user = await User.findOne({ refreshToken: jwt })
    if (!user) throw new UnauthenticatedError('Авторизуйтесь')
    
    const decodedUserId = user.decode(jwt)
    const verified = user.verify(decodedUserId)

    if (verified) {
        const accessToken = user.getAccessToken()
        res.status(200).json({ count: 1, users: [user.format()], jwt: accessToken })
    } else {
        throw new UnauthenticatedError('Авторизуйтесь')
    }
}

const isLoginAvailable = async (req, res) => {
    const user = await User.findOne({ login: req.body.possibleLogin })
    const isLoginAvailable = user == null
    
    res.status(200).json({ isLoginAvailable })
}

export { login, register, refresh, logout, isLoginAvailable }