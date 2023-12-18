import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import compression from 'compression'
import UsersRouter from './routes/users.router'
import CategoriesRouter from './routes/categories.router'

export default class App {
  public app
  public usersRouter: UsersRouter
  public categoriesRouter: CategoriesRouter

  constructor() {
    this.app = express()
    this.usersRouter = new UsersRouter()
    this.categoriesRouter = new CategoriesRouter()

    this.middlewares()
    this.routes()
  }

  private routes(): void {
    this.app.use('/users', this.usersRouter.router)
    this.app.use('/categories', this.categoriesRouter.router)
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