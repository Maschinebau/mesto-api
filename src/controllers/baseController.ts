import { Request, Response } from "express"
import { Model, Document } from "mongoose"
import { ErrorStatuses, ResponceCodes } from "../utils/responces.js"

export class BaseController<T extends Document> {
  model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  protected handleError = (res: Response, error: any) => {
    res.status(ResponceCodes.SERVER_ERROR).json({ error: ErrorStatuses.INTERNAL_SERVER })
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const documents = await this.model.find()
      res.status(ResponceCodes.SUCCESS).json(documents)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const params = req.params.userId || req.params.cardId
      const document = await this.model.findById(params)
      if (!document) {
        res.status(ResponceCodes.NOT_FOUND).json({ error: ErrorStatuses.DOC_NOT_FOUND })
      } else {
        res.status(ResponceCodes.SUCCESS).json(document)
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
        res.status(ResponceCodes.NOT_FOUND).json({ error: ErrorStatuses.DOC_NOT_FOUND })
      } else {
        res.status(ResponceCodes.SUCCESS).json(document)
      }
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
