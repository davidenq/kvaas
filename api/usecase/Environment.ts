import { AwilixContainer } from "awilix"
import { EnvironmentRepositoryDomain } from "domain/EnvironmentRepository"

export const GetEnvironments = async (container: AwilixContainer, cloudService: string, projectName: string) => {
  const repository = container.resolve<EnvironmentRepositoryDomain>('environmentRepository')
  const services = repository.getEnvironments(cloudService, projectName)
  return services;
}