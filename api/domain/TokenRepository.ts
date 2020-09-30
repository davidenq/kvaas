export class TokenRepositoryDomain {

  generateToken(email: string) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getEmailFromToken(token: string) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
}