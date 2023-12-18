import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../../../../env'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')

  console.log({token})

  if (!token) {
    return res.sendStatus(401)
  }

  try {
    const tokenValue = token.split(/\s+/)[1]
    await jwt.verify(tokenValue, JWT_SECRET)
    return next()
  } catch { 
    return res.sendStatus(401)
  }
}