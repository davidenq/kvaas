import { AwilixContainer } from 'awilix';
declare global {
  namespace Express {
    export interface Application {
      container: AwilixContainer
    }
    export interface Request {
      currentUserEmail: string
    }
  }
} 