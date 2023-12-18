import {Request, Response, NextFunction} from 'express'
import validator from 'validator'

export const validateBeveragePatch = (req: Request, res: Response, next: NextFunction) => {
  const errors = []
  const {name, description, categoryId} = req.body

  if (!name) {
    errors.push('name is required')
  } else if (typeof name !== 'string') {
    errors.push('name must be a string')
  } else if (name.length < 3 || name.length > 100) {
    errors.push('name is invalid')
  }

  if (!description) {
    errors.push('description is required')
  } else if (typeof description !== 'string') {
    errors.push('description must be a string')
  } else if (description.length < 3 || description.length > 150) {
    errors.push('description is invalid')
  }

  if (!categoryId) {
    errors.push('categoryId is required')
  } else if (!validator.isUUID(categoryId)) {
    errors.push('categoryId is invalid')
  }
  
  if (errors.length) {
    return res.status(422).json({errors})
  }

  next()
}