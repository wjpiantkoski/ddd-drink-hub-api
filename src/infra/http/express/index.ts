import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import compression from 'compression'
import UsersRouter from './routes/users.router'

export default class App {
  public app
  public usersRouter: UsersRouter

  constructor() {
    this.app = express()
    this.usersRouter = new UsersRouter()

    this.middlewares()
    this.routes()
  }

  private routes(): void {
    this.app.use('/users', this.usersRouter.router)
  }

  private middlewares(): void {
    this.app.use(helmet())
    this.app.disable('x-powered-by')

    this.app.use(cors({
        origin: '*',
        methods: 'GET,PUT,POST,DELETE'
    }))

    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: true}))
  }
}