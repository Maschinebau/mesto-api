import { Router } from 'express'
import UserController from '../../controllers/userController.js'

const router = Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.getAll)
router.get('/users/:userId', UserController.getById)
router.patch('/users/me', UserController.updateCurrentUserProfile)
router.patch('/users/me/avatar', UserController.updateCurrentUserAvatar)

export default router
