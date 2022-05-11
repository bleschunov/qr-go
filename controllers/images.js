import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { unlinkSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const staticFolder = resolve(__dirname, '..', 'static')

const options = {
    root: staticFolder
}

const getThumbnail = async (req, res) => {
    const { image } = req.params

    res.status(200).sendFile(image, options)
}

const uploadImage = async (req, res) => {
    const refreshToken = req.cookies.jwt
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    const { userId } = jwt.verify(refreshToken, refreshTokenSecret)

    const user = await User.findById(userId)

    if (user.thumbnail !== 'default.png') {
        try {
            unlinkSync( resolve(staticFolder, user.thumbnail) )
        } catch (error) {
            console.log(error)
        }
    }

    user.thumbnail = req.file.filename
    await user.save()

    res.status(200).json({ newImageName: req.file.filename })
}

export {
    getThumbnail,
    uploadImage
}