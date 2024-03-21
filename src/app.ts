import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import { authMiddleware } from './middleware/auth.js'

const app = express()
mongoose.connect('mongodb://127.0.0.1/mestodb')

app.use(express.json())
app.use(authMiddleware)

app.use(routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Сервер запущен на http://localhost:3000')
})
