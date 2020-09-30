import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const encrypt = (plainText: string) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(plainText, salt)
}

export const compare = (plainText: string, textHashed: string) => {
  return bcrypt.compareSync(plainText, textHashed)
}

export const validateGithubWebHook = (request: any, secret: any) => {

  // calculate the signature
  const expectedSignature = 'sha1=' +
    crypto.createHmac('sha1', secret)
      .update(JSON.stringify(request.body))
      .digest('hex');

  // compare the signature against the one in the request
  const signature = request.headers['x-hub-signature'];
  if (signature !== expectedSignature) {
    return false
  }
  return true
}