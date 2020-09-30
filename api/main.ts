/// <reference path="./types/express/index.d.ts"/>
/// <reference path="./types/kvaas/index.d.ts"/>

import * as bodyParser from 'body-parser';
import { authorizer } from './infra/webserver/middleware/auth';
import pino from 'pino-http';

import config from './infra/config/index';
import App from './infra/webserver/server';
import Dialect from './infra/bootstrap/dialect';
import { IController } from '@kvaas:TypesDefinitions';

import { Project } from './interface/controllers/ProjectController';
import { Credentials } from './interface/controllers/CredentialController';
import { Environment } from './interface/controllers/EnvironmentController';
import { PushEvent } from './interface/controllers/EventController';
import { User } from './interface/controllers/UserController';
import { CloudServices } from './interface/controllers/CloudServiceController'
import { AwilixContainer } from 'awilix';


const dialect = Dialect()


const controllers: IController[] = [
  Project,
  Credentials,
  Environment,
  PushEvent,
  CloudServices,
  User,
];

const middlewares = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  pino(),
  authorizer
];

dialect.then((container: AwilixContainer) => {
  const server = new App({
    port: config.environment.server.port,
    controllers: controllers,
    middleWares: middlewares,
    container: container,
  })
  server.start()
})
