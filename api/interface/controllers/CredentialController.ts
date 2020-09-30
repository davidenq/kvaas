import { Request, Response } from "express";
import { IController, } from '@kvaas:TypesDefinitions';
import { FindCredentials } from '../../usecase/Credentials'

export const Credentials: IController = {
  endpoint: '/api/v1/services/:serviceID/projects/:projectID/environments/:environmentID',
  method: 'get',
  handler: async (req: Request, res: Response) => {
    const { serviceID, projectID, environmentID } = req.params
    const email = req.currentUserEmail
    const kind = req.query.kind ? req.query.kind.toString() : 'all'
    const credentials = await FindCredentials(req.app.container, serviceID, projectID, environmentID, kind, email)

    return res.send({
      status: 'ok',
      code: 200,
      credentials: credentials
    });
  }
}

