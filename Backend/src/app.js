import express from 'express'
import authRouter from './routes/auth.routes.js'
import createUrlsRoute from './routes/createUrls.routes.js'
import folderContentRoute from './routes/folderContent.routes.js'
import getFolderRoute  from './routes/getFolder.routes.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/create',createUrlsRoute)
app.use('/api/create/',folderContentRoute)
app.use('/api/get',getFolderRoute)

export default app
