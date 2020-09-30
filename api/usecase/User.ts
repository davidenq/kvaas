import { AwilixContainer } from "awilix";
import { UserRepositoryDomain } from "../domain/UserRepository";
import { encrypt } from '../utils/crypt'

export const CreateUser = async (container: AwilixContainer, email: string, password: string, role: string) => {
  const repository = container.resolve<UserRepositoryDomain>('userRepository')
  const hash = encrypt(password)
  const id = repository.create(email, hash, role)
  return id;
}

export const FindUserByEmail = async (container: AwilixContainer, email: string) => {
  const repository = container.resolve<UserRepositoryDomain>('userRepository');
  return repository.getUserByEmail(email)
}

export const FindEmailByID = async (container: AwilixContainer, id: string) => {
  const repository = container.resolve<UserRepositoryDomain>('userRepository');
  return repository.getEmailByUUID(id)
}