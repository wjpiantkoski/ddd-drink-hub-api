import {Request, Response, NextFunction} from 'express'
import BeverageImageUploadService from '../../../../modules/beverage/services/beverage-image-upload/beverage-image-upload.service'

export const imageUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageFile = req.files.image
    const service = new BeverageImageUploadService()

    const filename = await service.run(imageFile)

    req.body.image = filename

    return next()
  } catch {
    return res.status(422).json({ message: 'Invalid image' })
  }
}