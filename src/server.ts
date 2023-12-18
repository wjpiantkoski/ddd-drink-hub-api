import App from "./infra/http/express"
import {SERVER_PORT} from './env'
import Database from "./infra/@shared/database/database"
import PopulateCategoriesServiceFactory from "./modules/beverage/services/populate-categories/populate-categories.service.factory"

class Server {
  private app

  constructor() {
    this.app = new App().app
  }

  public async run(): Promise<void> {
    const database = new Database()

    await database.connect()
    console.log('Database is connected')

    const populateCategories = PopulateCategoriesServiceFactory.create()
    await populateCategories.run()

    const server = this.app.listen(SERVER_PORT)
    console.log(`server running at ${SERVER_PORT}`)

    process.on('SIGINT', async () => {
      await database.disconnect()
      server.close()
    })
  }
}

new Server().run()