import {Request, Response, Router} from 'express'
import CreateBeverageUsecaseFactory from '../../../../modules/beverage/usecases/create-beverage/create-beverage.usecase.factory'
import UpdateBeverageUsecaseFactory from '../../../../modules/beverage/usecases/update-beverage/update-beverage.usecase.factory'
import ShowBeverageUsecaseFactory from '../../../../modules/beverage/usecases/show-beverage/show-beverage.usecase.factory'
import RemoveBeverageUsecaseFactory from '../../../../modules/beverage/usecases/remove-beverage/remove-beverage.usecase.factory'
import ListBeverageByCategoryUsecaseFactory from '../../../../modules/beverage/usecases/list-beverages-by-category/list-beverage-by-category.usecase.factory'
import { imageUpload } from '../middlewares/image-upload.middleware'
import { sanitizeBeverage } from '../middlewares/sanitization/sanitize-beverage.middleware'
import { validateBeveragePost } from '../middlewares/validations/beverage/validate-beverage-post.middleware'
import { validateBeveragePatch } from '../middlewares/validations/beverage/validate-beverage-patch.middlware'

export default class BeveragesRouter {
  private _router = Router()

  constructor() {
    this.routes()
  }

  get router(): Router {
    return this._router
  }

  private routes(): void {
    this.router.post(
      '/', 
      sanitizeBeverage,
      validateBeveragePost,
      imageUpload, 
      async (req: Request, res: Response) => {
        try {
          const createBeverageUsecase = CreateBeverageUsecaseFactory.create()
          const {status, data} = await createBeverageUsecase.execute(req.body)
          res.status(status).send(data)
        } catch {
          res.status(500).send()
        }
      }
    )

    this.router.get('/categories/:id', async (req: Request, res: Response) => {
      try {
        const listBeveragesUsecase = ListBeverageByCategoryUsecaseFactory.create()
        const {status, data} = await listBeveragesUsecase.execute(req.params.id)
        res.status(status).send(data)
      } catch {
        res.status(500).send()
      }
    })

    this.router.get('/:id', async (req: Request, res: Response) => {
      try {
        const showBeverageUsecase = ShowBeverageUsecaseFactory.create()
        
        const {status, data} = await showBeverageUsecase.execute({
          beverageId: req.params.id
        })

        res.status(status).send(data)
      } catch {
        res.status(500).send()
      }
    })

    this.router.patch(
      '/:id', 
      sanitizeBeverage, 
      validateBeveragePatch,
      imageUpload,
      async (req: Request, res: Response) => {
        try {
          const updateBeverageUsecase = UpdateBeverageUsecaseFactory.create()
          
          const {status, data} = await updateBeverageUsecase.execute({
            beverageId: req.params.id,
            beverage: req.body
          })

          res.status(status).send(data)
        } catch {
          res.status(500).send()
        }
      }
    )

    this.router.delete('/:id', async (req: Request, res: Response) => {
      try {
        const removeBeverageUsecase = RemoveBeverageUsecaseFactory.create()
        
        const {status, data} = await removeBeverageUsecase.execute({
          beverageId: req.params.id
        })

        res.status(status).send(data)
      } catch {
        res.status(500).send()
      }
    })
  }
}