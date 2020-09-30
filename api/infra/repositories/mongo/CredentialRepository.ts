import { Db, InsertOneWriteOpResult } from "mongodb";
import { CredentialRepositoryDomain } from "../../../domain/CredentialRepository";
import { regexEmail } from '../../../utils/regex'

export class CredentialRepository implements CredentialRepositoryDomain {

  private db: Db
  constructor(db: Db) {
    this.db = db
  }


  public async store(serviceName: string, projectName: string, environment: string, data: any): Promise<boolean> {
    //await this.createDocument(serviceName)
    const collection = this.db.collection("_" + serviceName)
    //first, it's important to delete many documents in order to avoid to duplicate data
    collection.deleteMany({ serviceName: projectName, environment: environment })

    //second, the data stored on Mongo has a custom structure in order to get a plain object
    //instead a object with nested elements.
    let status: InsertOneWriteOpResult<any>
    data.forEach((element: any) => {
      element.spec.forEach(async (el: any) => {
        status = await collection.insertOne({
          projectName: projectName,
          environment: environment,
          kind: element.kind,
          description: el.description,
          key: el.key,
          value: el.value,
          endpoint: el.endpoint,
          allowedUsers: el.users
        });
        return status
      });
    });
    return true
  }

  public async getCredentials(serviceName: string, projectName: string, environment: string, kind: string, email: string) {

    try {
      const collection = this.db.collection(serviceName)
      const and: any = []
      and.push({
        projectName: projectName,
      })
      and.push({
        environment: environment
      })

      if (kind !== 'all') {
        and.push({
          kind: kind
        })
      }
      const document = await collection
        .find(
          {
            allowedUsers: { $regex: regexEmail(email) },
            $and: and
          })
        .project(
          {
            _id: 0,
            projectName: "$projectName",
            environment: "$environment",
            kind: "$kind",
            description: "$description",
            key: "$key",
            value: "$value",
            endpoint: "$endpoint"
          })
        .toArray()
      return document
    } catch (e) {
      console.log(e)
    }
  }

  private async createDocument(documentName: string): Promise<boolean> {
    try {
      await this.db.createCollection("_" + documentName)
      console.log("collection has been created successful!")
      return true
    } catch (e) {
      console.log("collection already exists")
      return false
    }
  }
}