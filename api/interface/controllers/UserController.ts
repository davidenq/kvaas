import { Request, Response } from "express";
import { IController } from '@kvaas:TypesDefinitions';
import { CreateUser, FindUserByEmail } from '../../usecase/User'

export const User: IController = {
  endpoint: '/api/v1/users',
  method: 'post',
  handler: async (req: Request, res: Response) => {
    const { email, password, role } = req.body

    if (validateEmail(email)) {
      return res.status(400).json({
        status: 'failed',
        code: 404,
        message: 'bad email'
      })
    } else if (email === '') {
      return res.status(400).json({
        status: 'failed',
        code: 404,
        message: 'email is required'
      })
    } else if (password === '') {
      return res.status(400).json({
        status: 'failed',
        code: 404,
        message: 'password is required'
      })
    }

    //first, check if the email already has been created
    const emails: any = await FindUserByEmail(req.app.container, email)
    if (emails.length > 0) {
      return res.json({
        status: 'failed',
        code: 200,
        message: 'the email is already registered'
      })
    }
    const id = await CreateUser(req.app.container, email, password, role === '' ? 'user' : role)
    return res.json({
      status: 'ok',
      code: 200,
      message: `the email has been registered. The token generated to be used for request: ${id}`
    });
  }
}

const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(email).toLowerCase());
}