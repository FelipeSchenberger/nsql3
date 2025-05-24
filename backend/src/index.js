import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import heroRoutes from './routes/hero.routes.js'

dotenv.config()
const app = express()

app.use(express.json())

connectDB()

app.use('/api/heroes', heroRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Backend corriendo en el puerto ${process.env.PORT}`)
})
