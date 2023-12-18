import {Request, Response, NextFunction} from 'express'
import validator from 'validator'

export const validateBookmarkPost = (req: Request, res: Response, next: NextFunction) => {
  const errors = []
  const {userId, beverageId} = req.body

  if (!userId) {
    errors.push('userId is required')
  } else if (!validator.isUUID(userId)) {
    errors.push('userId is invalid')
  }

  if (!beverageId) {
    errors.push('beverageId is required')
  } else if (!validator.isUUID(beverageId)) {
    errors.push('beverageId is invalid')
  }
  
  if (errors.length) {
    return res.status(422).json({errors})
  }

  next()
}