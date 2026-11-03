import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.mjs'

dotenv.config()

const app = express()

// Allowed frontend origins
const allowedOrigins = [
  'https://frontend-ten-ashen-20.vercel.app',
  'http://localhost:5173',
  process.env.FRONTEND_URL
]
  .filter(Boolean)
  .flatMap(url => url.split(','))
  .map(url => url.trim().replace(/\/+$/, ''))
  .filter(Boolean)

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin.replace(/\/+$/, ''))) {
        return callback(null, true)
      }

      console.log('Blocked CORS Origin:', origin)
      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.use(express.json())

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MERN Auth API is running!',
    database:
      mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  })
})

// Authentication Routes
app.use('/api/auth', authRoutes)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  })
})

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected')

    const PORT = process.env.PORT || 5000

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(error => {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  })
