declare module '@kvaas:TypesDefinitions' {
  import { Request, Response } from "express";
  export interface IDb {
    db: any
    close(): any;
    connect(): any;
  }
  export interface IController {
    endpoint: string;
    method: string;
    handler: (req: Request, res: Response) => {};
  }
  export interface StatusOperation {
    status: string;
    code: number;
    data: any;
  }
  export interface HttpValidationRequest {
    status: string;
    code: number;
    message: string
  }
}