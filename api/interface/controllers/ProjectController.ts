import { Request, Response } from "express";
import { IController } from '@kvaas:TypesDefinitions';
import { GetProjects } from "../../usecase/Project";
import { validationRequest } from '../../utils/http-request-validation';

export const Project: IController = {
  endpoint: '/api/v1/services/:serviceID/projects',
  method: 'get',
  handler: async (req: Request, res: Response) => {
    const validate = validationRequest(req.params)
    if (validate.status === 'error') {
      return res.status(validate.code).json(validate)
    }

    const projects = await GetProjects(req.app.container, req.params.serviceID, req.currentUserEmail)
    return res.json({
      projects: projects
    });
  }
};