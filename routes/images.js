import { getThumbnail, uploadImage } from '../controllers/images.js'
import upload from '../middleware/uploadImage.js'

import { Router } from 'express'
const imagesRouter = Router()

imagesRouter.get('/:image', getThumbnail)
imagesRouter.post('/', upload.single('file'), uploadImage)

export default imagesRouter