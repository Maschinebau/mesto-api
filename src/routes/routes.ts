import { Router } from 'express'
import userRoutes from './user/userRoutes.js'

const api = Router().use(userRoutes)

export default Router().use('/', api)
