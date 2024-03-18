import { Request, Response } from 'express'
import { Model, Document } from 'mongoose'
import { UserModel } from '../models/userModel.js'

export class BaseController<T extends Document> {
  model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  protected handleError(res: Response, error: any) {
    res.status(500).json({ error: error.message })
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body.name || !req.body.about || !req.body.avatar) {
        res.status(400).json({ message: 'Не все поля заполнены' })
        return
      }

      const user = await UserModel.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar
      })

      res.status(201).json(user)
    } catch (error) {
      console.log(error)
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const documents = await this.model.find()
      res.status(200).json(documents)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const document = await this.model.findById(req.params.id)
      if (!document) {
        res.status(404).json({ error: 'Document not found' })
      } else {
        res.status(200).json(document)
      }
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
