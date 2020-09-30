import constants from './constants'

interface database {
  dialect: string;
  protocol: string;
  host: string;
  port: string;
  username: string;
  password: string;
  name: string;
}

const database: database = {
  dialect: process.env.DATABASE_DIALECT || constants.SUPPORTED_STORAGE.MONGO.NAME,
  protocol: process.env.DATABASE_PROTOCOL || 'mongodb://',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || '27017',
  username: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
  name: process.env.DATABASE_NAME || '',
}

interface server {
  port: number;
  health: string;
}

const server: server = {
  port: Number(process.env.PORT) || 3000,
  health: process.env.HEALTH_ENDPOINT || constants.SERVER.HEALTH_ENDPOINT,
}

const auth = {
  secret: process.env.SECRET || 'key-value',
}


const git = {
  raw_endpoint: process.env.GITHUB_RAW_ENDPOINT,
  webhook_secret: process.env.GITHUB_SECRET_WEBHOOK
}
export default {
  database,
  server,
  git,
  auth
};