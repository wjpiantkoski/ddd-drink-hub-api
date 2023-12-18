import {Request, Response, Router} from 'express'
import ListCategoriesUsecaseFactory from '../../../../modules/beverage/usecases/list-categories/list-categories.usecase.factory'

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
  }
}