import {Request, Response, NextFunction} from 'express'

export const sanitizeBeverage = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.name) {
    req.body.name = req.body.name.trim()
  }

  if (req.body.description) {
    req.body.description = req.body.description.toLowerCase()
  }

  next()
}