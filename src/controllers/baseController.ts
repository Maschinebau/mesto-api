import { Request, Response } from 'express'
import { Model, Document } from 'mongoose'
import { ErrorStatuses } from '../utils/errors.js'

export class BaseController<T extends Document> {
  model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  protected handleError = (res: Response, error: any) => {
    res.status(500).json({ error: error.message })
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const documents = await this.model.find()
      res.status(200).json(documents)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const params = req.params.userId || req.params.cardId
      const document = await this.model.findById(params)
      if (!document) {
        res.status(404).json({ error: ErrorStatuses.DOC_NOT_FOUND })
      } else {
        res.status(200).json(document)
      }
    } catch (error) {
      this.handleError(res, error)
    }
  }

  deleteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const params = req.params.userId || req.params.cardId
      const document = await this.model.findByIdAndDelete(params)
      if (!document) {
        res.status(404).json({ error: ErrorStatuses.DOC_NOT_FOUND })
      } else {
        res.status(200).json(document)
      }
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
