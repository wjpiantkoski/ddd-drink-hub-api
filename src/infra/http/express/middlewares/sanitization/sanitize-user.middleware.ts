import {Request, Response, NextFunction} from 'express'

export const sanitizeUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.name) {
    req.body.name = req.body.name.trim()
  }

  if (req.body.email) {
    req.body.email = req.body.email.trim().toLowerCase()
  }

  if (req.body.password) {
    req.body.password = req.body.password.trim()
  }

  next()
}