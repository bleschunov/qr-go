import jwt from 'jsonwebtoken'

import UnauthenticatedError from '../errors/unauthorized.js'

const authMiddleware = (req, res, next) => {
   
    const authHeader = req.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new UnauthenticatedError('Авторизуйтесь 1')

    try {
        const secret = process.env.ACCESS_TOKEN_SECRET
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, secret)

        req.user = payload

        next()
    } catch (error) {
        throw new UnauthenticatedError('Авторизуйтесь 2')
    }
}

export default authMiddleware