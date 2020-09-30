import { Db } from 'mongodb'
import { EnvironmentRepositoryDomain } from '../../../domain/EnvironmentRepository';

export class EnvironmentRepository implements EnvironmentRepositoryDomain {
  private db: Db
  constructor(db: Db) {
    this.db = db
  }
  async getEnvironments(cloudService: string, projectName: string) {
    const collection = this.db.collection(cloudService)
    const documents = await collection.aggregate([
      { $match: { "projectName": projectName } },
      { $group: { _id: "$environment" } }
    ])
    const environments = await documents.toArray()
    return environments
  }
}