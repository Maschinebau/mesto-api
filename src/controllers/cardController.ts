import { Request, Response } from 'express'
import { BaseController } from './baseController.js'
import { CardModel, ICard } from '../models/cardModel.js'
import { UserModel } from '../models/userModel.js'
import { ErrorStatuses, ResponceCodes } from '../utils/responces.js'

class CardController extends BaseController<ICard> {
  constructor() {
    super(CardModel)
  }

  createCard = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body.name || !req.body.link) {
        res.status(ResponceCodes.DATA_INCORRECT).json({ message: ErrorStatuses.MISSING_FIELDS })
        return
      }
      // @ts-ignore
      const user = await UserModel.findById(req.user._id).populate()

      if (!user) {
        res.status(ResponceCodes.NOT_FOUND).json({ message: ErrorStatuses.DOC_NOT_FOUND })
        return
      }

      const cardData = {
        ...req.body,
        owner: user
      }

      const document = await this.model.create(cardData)
      res.status(ResponceCodes.CREATED).json(document)
    } catch (error) {
      this.handleError(res)
    }
  }

  addLike = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedCard = await CardModel.findOneAndUpdate(
        { _id: req.params.cardId },
        // @ts-ignore
        { $addToSet: { likes: req.user._id } },
        { new: true }
      )

      if (!updatedCard) {
        res.status(ResponceCodes.NOT_FOUND).json({ message: ErrorStatuses.DOC_NOT_FOUND })
        return
      }

      res.status(ResponceCodes.SUCCESS).json(updatedCard)
    } catch (error) {
      this.handleError(res)
    }
  }

  deleteLike = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedCard = await this.model.findByIdAndUpdate(
        req.params.cardId,
        // @ts-ignore
        { $pull: { likes: req.user._id } },
        { new: true }
      )

      if (!updatedCard) {
        res.status(ResponceCodes.NOT_FOUND).json({ message: ErrorStatuses.DOC_NOT_FOUND })
        return
      }

      res.status(ResponceCodes.SUCCESS).json(updatedCard)
    } catch (error) {
      this.handleError(res)
    }
  }
}

export default new CardController()
