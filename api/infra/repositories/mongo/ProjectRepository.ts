import { Db } from 'mongodb'
import { regexEmail } from '../../../utils/regex';
import { ProjectRepositoryDomain } from '../../../domain/ProjectRepository';

export class ProjectRepository implements ProjectRepositoryDomain {
  private db: Db
  constructor(db: Db) {
    this.db = db
  }
  async getProjects(cloudService: string, email: string) {
    const collection = this.db.collection(cloudService)

    const aggregate = [
      {
        $addFields: {
          allowed:
          {
            $regexMatch: {
              input: "allowedUsers",
              regex: regexEmail(email)
            },
          }
        }
      },
      {
        $group: {
          _id: "$projectName"
        }
      }
    ]

    const documents = await collection.aggregate(aggregate)
    const projects = await documents.toArray()
    return projects
  }
}