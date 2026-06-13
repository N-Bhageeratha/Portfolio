import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './src/routes/authRoutes.js'
import projectRoutes from './src/routes/projectRoutes.js'
import skillRoutes from './src/routes/skillRoutes.js'
import messageRoutes from './src/routes/messageRoutes.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully')
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err)
  })

app.get('/', (req, res) => {
  res.send('Backend working')
})

app.use('/api/admin', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/messages', messageRoutes)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`)
})