import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import compression from 'compression'

export default class App {
  public app

  constructor() {
    this.app = express()

    this.middlewares()
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