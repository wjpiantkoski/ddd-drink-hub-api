import {Request, Response, Router} from 'express'
import CreateBookmarkUsecaseFactory from '../../../../modules/beverage/usecases/create-bookmark/create-bookmark.usecase.factory'

export default class BookmarksRouter {
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
        const createBookmark = CreateBookmarkUsecaseFactory.create()
        const {status, data} = await createBookmark.execute(req.body)
        res.status(status).send(data)
      } catch (err) {
        console.error(err)
        res.status(500).send()
      }
    })
  }
}