import {
    getAllPoints,
    createPoint,
    getPoint,
    updatePoint,
    completePoint,
    deletePoint
} from '../controllers/points.js'

import { Router } from 'express'
const pointsRouter = Router()

pointsRouter.patch('/complete', completePoint)

pointsRouter.route('/:pointId')
    .get(getPoint)
    .patch(updatePoint)
    .delete(deletePoint)

pointsRouter.route('/')
    .get(getAllPoints)
    .post(createPoint)


export default pointsRouter