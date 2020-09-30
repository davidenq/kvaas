import { AwilixContainer } from "awilix"
import { ProjectRepositoryDomain } from "../domain/ProjectRepository"

export const GetProjects = async (container: AwilixContainer, cloudService: string, email: string) => {
  const repository = container.resolve<ProjectRepositoryDomain>('projectRepository')
  const services = repository.getProjects(cloudService, email)
  return services;
}