import { Request, Response } from "express";
import environment from "../../infra/config/environment";
import { IController } from '@kvaas:TypesDefinitions';


export const Health: IController = {
  endpoint: environment.server.health,
  method: 'get',
  handler: (req: Request, res: Response) => {
    return res.send("ok");
  }
}