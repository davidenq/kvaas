import { Db, ObjectID, } from 'mongodb'
import { UserRepositoryDomain } from '../../../domain/UserRepository';
import { generateToken } from '../../../utils/token'


export class UserRepository implements UserRepositoryDomain {
  private db: Db
  constructor(db: Db) {
    this.db = db
  }

  async create(email: string, encriptedPassword: string, role: string) {
    const collection = await this.db.collection('users')
    const id = new ObjectID()
    const token = generateToken(id.toHexString())
    await collection.insertOne({
      _id: id,
      email: email,
      password: encriptedPassword,
      token: token,
      role: role
    })
    return token
  }

  async getUserByEmail(email: string) {
    const collection = await this.db.collection('users')
    const document = await collection.find({
      email: email
    })
    return document.toArray()
  }

  async getEmailByUUID(id: string) {

    const collection = await this.db.collection('users')
    const objectID = new ObjectID(id)
    const document = await collection.find({
      _id: objectID
    })
    const data: any = await document.toArray()
    if (data.length > 0) {
      const email = data[0].email
      return email
    }
    return ""
  }
}