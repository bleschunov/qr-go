import getAllAchievements from '../controllers/achievements.js'
import { Router } from 'express'

const achievementsRouter = Router()

achievementsRouter.get('/', getAllAchievements)

export default achievementsRouter