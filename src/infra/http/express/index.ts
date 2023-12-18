import cors from 'cors'
import path from 'path'
import helmet from 'helmet'
import express from 'express'
import compression from 'compression'
import UsersRouter from './routes/users.router'
import CategoriesRouter from './routes/categories.router'
import BeveragesRouter from './routes/beverages.router'
import BookmarksRouter from './routes/bookmarks.router'

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
    this.app.use('/categories', this.categoriesRouter.router)
    this.app.use('/beverages', this.beveragesRouter.router)
    this.app.use('/bookmarks', this.bookmarksRouter.router)
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