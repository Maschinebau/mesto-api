import { Request, Response } from 'express'
import { BaseController } from './baseController.js'
import { UserModel, IUser } from '../models/userModel.js'
import { ErrorStatuses } from '../utils/errors.js'

class UserController extends BaseController<IUser> {
  constructor() {
    super(UserModel)
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body.name || !req.body.about || !req.body.avatar) {
        res.status(400).json({ message: ErrorStatuses.MISSING_FIELDS })
        return
      }

      const document = await this.model.create(req.body)
      res.status(201).json(document)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  updateCurrentUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body.name && !req.body.about) {
        res.status(400).json({ message: 'Ни одно из полей не заполнено' })
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
        res.status(404).json({ error: ErrorStatuses.DOC_NOT_FOUND })
        return
      }

      res.status(200).json(updatedUser)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  updateCurrentUserAvatar = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body.avatar) {
        res.status(400).json({ message: 'Не заполнено поле с сылкой' })
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
        res.status(404).json({ error: ErrorStatuses.DOC_NOT_FOUND })
        return
      }

      res.status(200).json(updatedUser)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}

export default new UserController()
