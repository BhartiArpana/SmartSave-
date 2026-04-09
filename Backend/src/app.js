import express from 'express'
import authRouter from './routes/auth.routes.js'
import folderRouter from './routes/folder.routes.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/create',folderRouter)

export default app
