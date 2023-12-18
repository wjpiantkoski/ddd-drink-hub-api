import {Request, Response, Router} from 'express'
import ListCategoriesUsecaseFactory from '../../../../modules/beverage/usecases/list-categories/list-categories.usecase.factory'
import ListBeverageByCategoryUsecaseFactory from '../../../../modules/beverage/usecases/list-beverages-by-category/list-beverage-by-category.usecase.factory'

export default class CategoriesRouter {
  private _router = Router()

  constructor() {
    this.routes()
  }

  get router(): Router {
    return this._router
  }

  private routes(): void {
    this.router.get('/', async (req: Request, res: Response) => {
      const listCategoriesUsecase = ListCategoriesUsecaseFactory.create()
      const {status, data} = await listCategoriesUsecase.execute()
      res.status(status).send(data)
    })

    this.router.get('/:id/beverages', async (req: Request, res: Response) => {
      try {
        const listBeveragesUsecase = ListBeverageByCategoryUsecaseFactory.create()
        const {status, data} = await listBeveragesUsecase.execute(req.params.id)
        res.status(status).send(data)
      } catch {
        res.status(500).send()
      }
    })
  }
}