import {Request, Response, Router} from 'express'
import CreateBeverageUsecaseFactory from '../../../../modules/beverage/usecases/create-beverage/create-beverage.usecase.factory'

export default class BeveragesRouter {
  private _router = Router()

  constructor() {
    this.routes()
  }

  get router(): Router {
    return this._router
  }

  private routes(): void {
    this.router.post('/', async (req: Request, res: Response) => {
      try {
        const createBeverageUsecase = CreateBeverageUsecaseFactory.create()
        const {status, data} = await createBeverageUsecase.execute(req.body)
        res.status(status).send(data)
      } catch {
        res.status(500).send()
      }
    })
  }
}