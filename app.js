import 'dotenv/config'
import 'express-async-errors'

// SERVER
import express from 'express'
const app = express()

// MIDDLEWARE
import cookieParser from 'cookie-parser'
app.use(express.json())
app.use(cookieParser())
app.use(express.static('static'))

// SECURITY
import helmet from 'helmet'
import cors from 'cors'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
app.use(helmet())
app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true 
}))
app.use(xss())
// app.use(rateLimit())

// ROUTES
import usersRouter from './routes/users.js'
import pointsRouter from './routes/points.js'
import authRouter from './routes/auth.js'
import achievementsRouter from './routes/achievements.js'
import imagesRouter from './routes/images.js'
import authMiddleware from './middleware/auth.js'
app.use('/api/v1/users', authMiddleware, usersRouter)
app.use('/api/v1/points', authMiddleware, pointsRouter)
app.use('/api/v1/achievements', authMiddleware, achievementsRouter)
app.use('/api/v1/images', authMiddleware, imagesRouter)
app.use('/api/v1/auth', authRouter)


// NOT EXISTING ROUTE
import notFoundMiddleware from './middleware/notFound.js'
app.use(notFoundMiddleware)

// ERROR HANDLERS
import errorHandlerMiddleware from './middleware/errorHandler.js'
app.use(errorHandlerMiddleware)

// RUNNING
import connectDb from './db/connect.js'

const port = process.env.PORT
const mongoUri = process.env.MONGO_URI

const start = async () => {
    try {
        await connectDb(mongoUri)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()