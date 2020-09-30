import { AwilixContainer } from "awilix";
import { CredentialRepositoryDomain } from "domain/CredentialRepository";

export const StoreCredentials = async (
  container: AwilixContainer,
  serviceName: string,
  projectName: string,
  environment: string,
  data: any
) => {
  const repository = container.resolve<CredentialRepositoryDomain>('credentialRepository')
  return repository.store(serviceName, projectName, environment, data)
}

export const FindCredentials = async (
  container: AwilixContainer,
  serviceName: string,
  projectName: string,
  environment: string,
  kind: string,
  email: string
) => {
  const repository = container.resolve<CredentialRepositoryDomain>('credentialRepository')
  return repository.getCredentials(serviceName, projectName, environment, kind, email)
}