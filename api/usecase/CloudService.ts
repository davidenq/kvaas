import { AwilixContainer } from "awilix"
import { CloudServiceRepositoryDomain } from "domain/CloudServiceRepository"

export const GetCloudServices = async (container: AwilixContainer) => {
  const repository = container.resolve<CloudServiceRepositoryDomain>('cloudServiceRepository')
  const services = repository.getServices()
  return services;
}