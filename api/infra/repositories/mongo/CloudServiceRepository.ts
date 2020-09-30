import { Db } from 'mongodb'
import { CloudServiceRepositoryDomain } from '../../../domain/CloudServiceRepository';

export class CloudServiceRepository implements CloudServiceRepositoryDomain {
  private db: Db
  constructor(db: Db) {
    this.db = db
  }
  async getServices() {
    const dataCollection = await this.db.listCollections()
    const collections = await dataCollection.toArray()

    return collections
      .filter(collection => collection.name.includes("_"))
      .map(collection => collection.name.replace("_", ""))
  }
}