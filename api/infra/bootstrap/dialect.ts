import { asClass, createContainer, InjectionMode, asValue } from 'awilix';
import environment from '../config/environment';
import constants from '../config/constants';
import { IDb } from '@kvaas:TypesDefinitions';

export default async () => {

  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
  })

  //Support for MongoDB
  if (environment.database.dialect === constants.SUPPORTED_STORAGE.MONGO.NAME) {
    const { MongoDb } = await import('../storage/mongo')
    const { ProjectRepository } = await import('../../infra/repositories/mongo/ProjectRepository');
    const { EnvironmentRepository } = await import('../../infra/repositories/mongo/EnvironmentRepository');
    const { CloudServiceRepository } = await import('../../infra/repositories/mongo/CloudServiceRepository');
    const { CredentialRepository } = await import('../../infra/repositories/mongo/CredentialRepository');
    const { UserRepository } = await import('../../infra/repositories/mongo/UserRepository');

    container.register({
      mongoDB: asClass(MongoDb).singleton(),
    });

    const db = await container.resolve<IDb>('mongoDB').connect()
    container.register({
      db: asValue(db),
      projectRepository: asClass(ProjectRepository),
      environmentRepository: asClass(EnvironmentRepository),
      cloudServiceRepository: asClass(CloudServiceRepository),
      credentialRepository: asClass(CredentialRepository),
      userRepository: asClass(UserRepository)
    });
  }

  //Support for MySQL (not implemented yet)
  /*
  if (environment.database.dialect === constants.SUPPORTED_STORAGE.MYSQL.NAME) {
    
    const { MySQLDB } = await import('../storage/mysql')
    const { RepositoryMySQL } = await import ('../infra/repositories/RepositoryMySQL')
    const instanceDB: IDb = new MySQLDB()
    db.getDb()
    container.register({
      repository: asClass(RepositoryMongo)
        .singleton().inject(() => db)
    })
  }
  */

  return await container

} 