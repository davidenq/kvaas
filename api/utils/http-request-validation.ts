import { HttpValidationRequest } from '@kvaas:TypesDefinitions';
export const validationRequest = (params: any): HttpValidationRequest => {
  const { serviceID, applicationID, environmentID } = params;
  const outcome: HttpValidationRequest = {
    status: '',
    code: 0,
    message: ''
  }
  if (serviceID === '') {
    outcome.status = 'error';
    outcome.code = 400;
    outcome.message = 'serviceID is required. You can point to /api/v1/services to get a list of services you can access.';
  }

  if (applicationID === '') {
    outcome.status = 'error';
    outcome.code = 400;
    outcome.message = 'applicationID is required. You can point to /api/v1/services/{serviceID}/applications to get a list of applications to belong to some service you can access.';
  }

  if (environmentID === '') {
    outcome.status = 'error';
    outcome.code = 400;
    outcome.message = 'environmentID is required. You can point to /api/v1/services/{serviceID}/applications/{applicationID}/environments to get a list of environments to belong to the application you can access.';
  }

  return outcome
}