import jwt from 'jsonwebtoken'
import config from '../infra/config/index'
export const generateToken = (id: string) => {
  let token = jwt.sign({ id: id }, config.environment.auth.secret, {
    algorithm: 'HS256',
    expiresIn: '10y'
  })
  return token
}