import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../../../../env'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.sendStatus(401)
  }

  try {
    await jwt.verify(token, JWT_SECRET)
    return next()
  } catch { 
    return res.sendStatus(401)
  }
}