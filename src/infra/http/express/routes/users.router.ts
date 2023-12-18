import {Request, Response, Router} from 'express'
import UserRegisterUsecaseFactory from '../../../../modules/user/usecases/user-register/user-register.usecase.factory'
import UserLoginUsecaseFactory from '../../../../modules/user/usecases/user-login/user-login.usecase.factory'
import { sanitizeUser } from '../middlewares/sanitization/sanitize-user.middleware'
import { validateUserSignup } from '../middlewares/validations/user/validate-user-signup.middleware'
import { validateUserSignin } from '../middlewares/validations/user/validate-user-signin.middleware'

export default class UsersRouter {
  private _router = Router()

  constructor() {
    this.routes()
  }

  get router(): Router {
    return this._router
  }

  private routes(): void {
    this.router.post(
      '/sign-up', 
      sanitizeUser,
      validateUserSignup,
      async (req: Request, res: Response) => {
        try {
          const userRegisterUsecase = UserRegisterUsecaseFactory.create()
          const {status, data} = await userRegisterUsecase.execute(req.body)
          res.status(status).send(data)
        } catch {
          res.status(500).send()
        }
      }
    )

    this.router.post(
      '/sign-in', 
      sanitizeUser, 
      validateUserSignin,
      async (req: Request, res: Response) => {
        try {
          const userLoginUsecase = UserLoginUsecaseFactory.create()
          const {status, data} = await userLoginUsecase.execute(req.body)
          res.status(status).send(data)
        } catch {
          res.status(500).send()
        }
      }
    )
  }
}