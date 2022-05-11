import mongoose from 'mongoose'
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Имя обязательно'],
        trim: true
    },   
    login: {
        type: String,
        required: [true, 'Придумайте логин'],
        unique: [true, 'Такой логин уже существует'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Придумайте пароль'],
        trim: true
    },
    thumbnail: {
        type: String,
        default: 'default.png'
    },
    access: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    completedPoints: {
        type: [mongoose.Types.ObjectId],
        ref: 'Point'
    },
    completedAchievements: {
        type: [mongoose.Types.ObjectId],
        ref: 'Achievement'
    },
    refreshToken: String
})

UserSchema.methods.getAccessToken = function () {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const { access, _id: userId } = this
    const accessToken = jwt.sign({ access, userId }, accessTokenSecret, { expiresIn: '15m' })
    return accessToken
}

UserSchema.methods.getRefreshToken = function () {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    const { _id: userId } = this
    const refreshToken = jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '1d' })
    return refreshToken
}

UserSchema.methods.decode = function (refreshToken) {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    const { userId } = jwt.verify(refreshToken, refreshTokenSecret)
    return userId
}

UserSchema.methods.verify = function (decodedUserId) {
    return decodedUserId == this._id
}

UserSchema.methods.format = function () {
    const { _id, login, access, name, thumbnail, completedPoints, completedAchievements } = this

    return { _id, login, access, name, thumbnail, completedPoints, completedAchievements }
}

const User = mongoose.model('User', UserSchema)

export default User