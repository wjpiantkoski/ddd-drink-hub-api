import {Request, Response, Router} from 'express'
import UserRegisterUsecaseFactory from '../../../../modules/user/usecases/user-register/user-register.usecase.factory'
import UserLoginUsecaseFactory from '../../../../modules/user/usecases/user-login/user-login.usecase.factory'
import ListUserBookmarksUsecaseFactory from '../../../../modules/beverage/usecases/list-user-bookmarks/list-user-bookmark.usecase.factory'

export default class UsersRouter {
  private _router = Router()

  constructor() {
    this.routes()
  }

  get router(): Router {
    return this._router
  }

  private routes(): void {
    this.router.post('/sign-up', async (req: Request, res: Response) => {
      try {
        const userRegisterUsecase = UserRegisterUsecaseFactory.create()
        const {status, data} = await userRegisterUsecase.execute(req.body)
        res.status(status).send(data)
      } catch {
        res.status(500).send()
      }
    })

    this.router.post('/sign-in', async (req: Request, res: Response) => {
      try {
        const userLoginUsecase = UserLoginUsecaseFactory.create()
        const {status, data} = await userLoginUsecase.execute(req.body)
        res.status(status).send(data)
      } catch {
        res.status(500).send()
      }
    })

    this.router.get('/:id/bookmarks', async (req: Request, res: Response) => {
      try {
        const listBookmarksUsecase = ListUserBookmarksUsecaseFactory.create()

        const {status, data} = await listBookmarksUsecase.execute({
          userId: req.params.id
        })

        res.status(status).send(data)
      } catch {
        res.status(500).send()
      }
    })
  }
}