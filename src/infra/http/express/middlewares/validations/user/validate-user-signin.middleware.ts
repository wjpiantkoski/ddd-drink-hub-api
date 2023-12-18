import {Request, Response, NextFunction} from 'express'
import validator from 'validator'

export const validateUserSignin = (req: Request, res: Response, next: NextFunction) => {
  const errors = []
  const {email, password} = req.body

  if (!email) {
    errors.push('email is required')
  } else if (!validator.isEmail(email)) {
    errors.push('email is invalid')
  }

  if (!password) {
    errors.push('password is required')
  } else if (password.length < 8) {
    errors.push('password must be at least 8 characters')
  }
  
  if (errors.length) {
    return res.sendStatus(401)
  }

  next()
}