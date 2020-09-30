export class UserRepositoryDomain {

  create(email: string, encriptedPassword: string, role: string) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getUserByEmail(email: string) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getEmailByUUID(id: string) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
}