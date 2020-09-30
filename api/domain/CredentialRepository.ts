export class CredentialRepositoryDomain {

  store(serviceName: string, applicationName: string, environment: string, data: any): Promise<boolean> {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getCredentials(serviceName: string, applicationName: string, environment: string, kind: string, email: string) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
}