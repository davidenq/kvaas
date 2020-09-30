import { Request, Response } from 'express'

const loggerMiddleware = (req: Request, resp: Response, next: any) => {
  req.log.info('Request logged:', req.method, req.path)
  next()
}

export default loggerMiddleware