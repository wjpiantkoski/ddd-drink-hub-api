import cors from 'cors'
import path from 'path'
import helmet from 'helmet'
import express from 'express'
import compression from 'compression'
import fileupload from 'express-fileupload'
import UsersRouter from './routes/users.router'
import CategoriesRouter from './routes/categories.router'
import BeveragesRouter from './routes/beverages.router'
import BookmarksRouter from './routes/bookmarks.router'
import { verifyToken } from './middlewares/verify-token.middleware'
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../swagger/swagger-output.json')

export default class App {
  public app
  public usersRouter: UsersRouter
  public categoriesRouter: CategoriesRouter
  public beveragesRouter: BeveragesRouter
  public bookmarksRouter: BookmarksRouter

  constructor() {
    this.app = express()
    this.usersRouter = new UsersRouter()
    this.categoriesRouter = new CategoriesRouter()
    this.beveragesRouter = new BeveragesRouter()
    this.bookmarksRouter = new BookmarksRouter()

    this.middlewares()
    this.routes()

    this.app.use(
      '/images', 
      express.static(path.join(__dirname, '../../images'))
    )
  }

  private routes(): void {
    this.app.use('/users', this.usersRouter.router)
    this.app.use('/categories', verifyToken, this.categoriesRouter.router)
    this.app.use('/beverages', verifyToken, this.beveragesRouter.router)
    this.app.use('/bookmarks', verifyToken, this.bookmarksRouter.router)
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }

  private middlewares(): void {
    this.app.use(helmet())
    this.app.disable('x-powered-by')

    this.app.use(cors({
        origin: '*',
        methods: 'GET,PUT,POST,DELETE'
    }))

    this.app.use(fileupload({
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024
      }
    }))

    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: true}))
  }
}