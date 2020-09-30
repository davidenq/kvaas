import { Request, Response } from "express";
import { IController } from '@kvaas:TypesDefinitions';
import { GetCloudServices } from '../../usecase/CloudService';


export const CloudServices: IController = {
  endpoint: '/api/v1/services',
  method: 'get',
  handler: async (req: Request, res: Response) => {
    const services = await GetCloudServices(req.app.container);
    return res.json({
      cloudServices: services
    });
  }
};