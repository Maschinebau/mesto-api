import { Router } from 'express'
import userRoutes from './user/userRoutes.js'
import cardRoutes from './card/cardRoutes.js'

const api = Router().use(userRoutes).use(cardRoutes)

export default Router().use('/', api)
