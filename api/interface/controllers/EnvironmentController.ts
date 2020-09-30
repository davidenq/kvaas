import { Request, Response } from "express";
import { IController } from '@kvaas:TypesDefinitions';
import { GetEnvironments } from '../../usecase/Environment';
import { validationRequest } from '../../utils/http-request-validation';

export const Environment: IController = {
  endpoint: '/api/v1/services/:serviceID/projects/:projectID/environments',
  method: 'get',
  handler: async (req: Request, res: Response) => {

    const environments = await GetEnvironments(req.app.container, req.params.serviceID, req.params.projectID)
    return res.send({
      environments: environments
    });
  }
};