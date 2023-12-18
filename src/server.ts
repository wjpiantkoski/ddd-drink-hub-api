import App from "./infra/http/express"
import {SERVER_PORT} from './env'

class Server {
  private app

  constructor() {
    this.app = new App().app
  }

  public async run(): Promise<void> {
    const server = this.app.listen(SERVER_PORT)
    console.log(`server running at ${SERVER_PORT}`)

    process.on('SIGINT', async () => {
      server.close()
    })
  }
}

new Server().run()