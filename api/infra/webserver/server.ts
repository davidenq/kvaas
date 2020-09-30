import express, { Application } from 'express';
import { IController } from '@kvaas:TypesDefinitions';
import { Health } from '../../interface/controllers/HealthController'

export default class App {
  private app: Application
  public port: number

  constructor(appInit: any) {
    this.app = express()
    this.port = appInit.port
    this.app.get(Health.endpoint, Health.handler)
    this.middlewares(appInit.middleWares)
    this.routes(appInit.controllers)
    this.app.container = appInit.container
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare)
    })
  }

  private routes(controllers: IController[]) {
    controllers.forEach((controller: IController) => {
      if (controller.method.toLowerCase() === 'get') {
        this.app.get(controller.endpoint, controller.handler)
      }
      if (controller.method.toLowerCase() === 'post') {
        this.app.post(controller.endpoint, controller.handler)
      }
      if (controller.method.toLowerCase() === 'put') {
        this.app.put(controller.endpoint, controller.handler)
      }
      if (controller.method.toLowerCase() === 'delete') {
        this.app.delete(controller.endpoint, controller.handler)
      }
    });
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`)
    })
  }
}