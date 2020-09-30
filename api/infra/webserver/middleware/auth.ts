import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { FindEmailByID } from '../../../usecase/User';
import config from '../../../infra/config/index';
import { validateGithubWebHook } from '../../../utils/crypt';

export const authorizer = (req: Request, res: Response, next: NextFunction) => {

  const headers = req.headers
  const authorization = headers['authorization']
  const xHubSignature: any = headers['x-hub-signature']

  if (authorization !== undefined) {
    const token: any = authorization && authorization.split(' ')[1]
    if (token === null) {
      return res.sendStatus(401)
    }
    jwt.verify(token, config.environment.auth.secret as string, async (err: any, claims: any) => {
      if (err) {
        return res.sendStatus(403)
      } else {
        const { id } = claims
        const container = req.app.container
        const email: any = await FindEmailByID(container, id)
        if (email === "root@root") {
          req.currentUserEmail = ''
        } else {
          req.currentUserEmail = email
        }
        next();
      }
    })
  } else if (xHubSignature !== undefined) {
    const status = validateGithubWebHook(req, config.environment.git.webhook_secret)
    if (status) {
      next()
    } else {
      return res.sendStatus(401)
    }
  } else {
    return res.sendStatus(401)
  }
}