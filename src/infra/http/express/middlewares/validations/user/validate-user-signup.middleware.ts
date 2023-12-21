import {Request, Response, NextFunction} from 'express'
import validator from 'validator'

export const validateUserSignup = (req: Request, res: Response, next: NextFunction) => {
  const errors = []
  const {name, email, password} = req.body

  if (!name) {
    errors.push('name is required')
  } else if (typeof name !== 'string') {
    errors.push('name must be a string')
  } else if (name.length < 3 || name.length > 100) {
    errors.push('name is invalid')
  }

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
    return res.status(422).json({ errors })
  }

  next()
}