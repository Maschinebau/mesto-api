import { Router } from 'express'
import UserController from '../../controllers/userController.js'

const router = Router()

router.post('/users', UserController.create)
router.get('/users', UserController.getAll)
router.get('/users/:userId', UserController.getById)

export default router
