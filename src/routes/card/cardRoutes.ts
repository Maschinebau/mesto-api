import { Router } from 'express'
import CardController from '../../controllers/cardController.js'

const router = Router()

router.get('/cards', CardController.getAll)
router.post('/cards', CardController.createCard)
router.delete('/cards/:cardId', CardController.deleteById)
router.put('/cards/:cardId/likes', CardController.addLike)
router.delete('/cards/:cardId/likes', CardController.deleteLike)

export default router
