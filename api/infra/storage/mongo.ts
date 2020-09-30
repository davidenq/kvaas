import { Db, MongoClient } from 'mongodb';
import config from '../config'
import { IDb } from '@kvaas:TypesDefinitions';

export class MongoDb implements IDb {

  private client!: MongoClient;
  private connectionString: string
  public db!: Promise<Db>;

  constructor() {
    const infoDB = config.environment.database

    this.connectionString = infoDB.protocol;
    this.connectionString += infoDB.username;
    this.connectionString += ':';
    this.connectionString += infoDB.password;
    this.connectionString += '@';
    this.connectionString += infoDB.host;
    this.connectionString += ':';
    this.connectionString += infoDB.port;
    this.connectionString += '/';
    this.connectionString += infoDB.name;
  }

  public close() {
    /*if (this.client) {
      this
        .client
        .close()
        .then()
        .catch(error => {
          console.error(error);
        });
    } else {
      console.error('close: client is undefined');
    }*/
  }

  public async connect() {
    this.client = await MongoClient.connect(this.connectionString, { useUnifiedTopology: true });
    console.info(`Connectiong to ${this.connectionString}`);
    return this.client.db(config.environment.database.name)
  }
}