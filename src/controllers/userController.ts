import { Request, Response } from 'express'
import { BaseController } from './baseController.js'
import { UserModel, IUser } from '../models/userModel.js'
import { ErrorStatuses, ResponceCodes } from '../utils/responces.js'

class UserController extends BaseController<IUser> {
  constructor() {
    super(UserModel)
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body.name || !req.body.about || !req.body.avatar) {
        res.status(ResponceCodes.DATA_INCORRECT).json({ message: ErrorStatuses.MISSING_FIELDS })
        return
      }

      const document = await this.model.create(req.body)
      res.status(ResponceCodes.CREATED).json(document)
    } catch (error) {
      this.handleError(res)
    }
  }

  updateCurrentUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body.name && !req.body.about) {
        res.status(ResponceCodes.DATA_INCORRECT).json({ message: 'Ни одно из полей не заполнено' })
        return
      }

      // @ts-ignore
      const user = req.user._id
      const fieldsToUpdate = { $set: {} }
      // @ts-ignore
      if (req.body.name) fieldsToUpdate.$set.name = req.body.name
      // @ts-ignore
      if (req.body.about) fieldsToUpdate.$set.about = req.body.about

      const updatedUser = await this.model.findOneAndUpdate({ _id: user }, fieldsToUpdate, {
        new: true
      })

      if (!updatedUser) {
        res.status(ResponceCodes.NOT_FOUND).json({ error: ErrorStatuses.DOC_NOT_FOUND })
        return
      }

      res.status(ResponceCodes.SUCCESS).json(updatedUser)
    } catch (error) {
      this.handleError(res)
    }
  }

  updateCurrentUserAvatar = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body.avatar) {
        res.status(ResponceCodes.DATA_INCORRECT).json({ message: 'Не заполнено поле с сылкой' })
        return
      }
      // @ts-ignore
      const user = req.user._id
      const updatedUser = await this.model.findOneAndUpdate(
        { _id: user },
        { $set: { avatar: req.body.avatar } },
        { new: true }
      )

      if (!updatedUser) {
        res.status(ResponceCodes.NOT_FOUND).json({ error: ErrorStatuses.DOC_NOT_FOUND })
        return
      }

      res.status(ResponceCodes.SUCCESS).json(updatedUser)
    } catch (error) {
      this.handleError(res)
    }
  }
}

export default new UserController()
