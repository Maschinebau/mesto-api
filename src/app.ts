import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'

const PORT = process.env.PORT || 3000

const app = express()
mongoose.connect('mongodb://localhost:27017/mestodb')

app.use(routes)

app.listen(PORT, () => {
  console.log('Сервер запущен на http://localhost:3000')
})
