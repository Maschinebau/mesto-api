import { Request, Response, NextFunction } from 'express'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: '65fa193c45fbadf1ada31af7'
  }

  next()
}
