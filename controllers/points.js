import NotFoundError from '../errors/notFound.js'
import Point from '../models/Point.js'
import User from '../models/User.js'

const createPointController = (action) => async (req, res) => {
    const points = await action(req).select('_id title location code completedBy')

    if (!points) throw new NotFoundError(`Площадка не найдена`)

    let body
    if (Array.isArray(points)) body = points
    else body = [ points ]

    if (req.user.access !== 'admin') {
        body.forEach(point => point.format())
    }

    const response = {
        count: body.length,
        points: body
    }

    res.status(200).json(response)
}

const getAllPoints = createPointController(
    () => Point.find({})
)

const getPoint = createPointController(
    req => Point.findById(req.params.pointId)
)

const updatePoint = createPointController(
    req => {
        return Point.findByIdAndUpdate(
            req.params.pointId, 
            req.body, 
            { new: true, runValidators: true }
        )
    }
)

const deletePoint = async (req, res) => {
    const point = await Point.findByIdAndDelete(req.params.pointId).select('_id title location code completedBy')
    if (!point) throw new NotFoundError(`Площадка не найдена`)

    const user = await User.updateOne({ _id: req.user.userId }, {
        $pull: {
            completedPoints: point._id
        }
    })
    if (!user) throw new NotFoundError(`Пользователь не найден`)

    let body
    if (Array.isArray(point)) body = point
    else body = [ point ]

    if (req.user.access !== 'admin') {
        body.forEach(point => point.format())
    }

    const response = {
        count: body.length,
        points: body
    }

    res.status(200).json(response)
}

// =====

const createPoint = async (req, res) => {
    const newPoint = await Point.create(req.body)
    const point = await Point.findById(newPoint._id).select('title location code _id code')

    if (req.user.access !== 'admin') point.format()

    res.status(201).json({ count: 1, points: [ point ] })
}

const completePoint = async (req, res) => {
    const pointId = req.body?.pointId

    console.log(pointId)
    
    let point
    if (pointId) {
        point = await Point.findOne({ _id: pointId })
        if (!point) throw new NotFoundError('Площадка не найдена')
        if (point.code !== req.body.code) throw new NotFoundError('Код не совпадает') 
    } 

    point = await Point.findOne({ code: req.body.code }).select('_id')
    if (!point) throw new NotFoundError('Площадка не найдена')

    const user = await User.findByIdAndUpdate(
        req.user.userId,
        { $addToSet: { completedPoints: point._id } },
        { new: true, runValidators: true }
    )
    if (!user) throw new NotFoundError('Пользователь не найден')

    res.status(200).json({ count: 1, users: [user.format()] })
}

export {
    getAllPoints,
    getPoint,
    createPoint,
    updatePoint,
    deletePoint,
    completePoint
}