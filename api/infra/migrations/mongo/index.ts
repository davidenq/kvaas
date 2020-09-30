import { UserRepository } from '../../../infra/repositories/mongo/UserRepository'
import { Db, MongoClient, ObjectID } from 'mongodb'
import config from '../../config/index'
import { encrypt } from '../../../utils/crypt'

const database = config.environment.database

const adminUsername = process.env.ADMIN_USERNAME || Math.random().toString(36).substr(2, 10) + '@ppm.com.ec'
const adminPassword = process.env.ADMIN_PASSWORD || Math.random().toString(36).substr(2, 10)

const startMongo = async (username: string, password: string, dbName: string) => {
  try {
    const url = `mongodb://${username}:${password}@${database.host}:${database.port}/${dbName}`
    const client = await MongoClient.connect(url, { useUnifiedTopology: true })
    const db = await client.db(database.name)
    const user = new UserRepository(db)
    const encryptedKey = encrypt(adminPassword)
    const generatedToken = await user.create(adminUsername, encryptedKey, 'root')
    console.log('users collection has been created!')
    console.log('root user has been created!')
    console.log('===========================')
    console.log("Store below credentials in a secury place. The token will be used for all request")
    console.log('username: ', adminUsername)
    console.log('password: ', adminPassword)
    console.log('token: ', generatedToken)
    console.log('===========================')
    setTimeout(async () => {
      await client.close();
    }, 1000)
  } catch (e) {
    console.log('\x1b[31m', `ERROR: ${e.codeName}`)
    console.log(` Check if the DB '${dbName}' has been created previously. Also, check the access credentials before continuing.`)
    console.log('\x1b[0m')
  }
}

startMongo(database.username, database.password, database.name);

