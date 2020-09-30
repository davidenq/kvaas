import { Request, Response } from "express";
import environment from "../../infra/config/environment";
import { IController } from '@kvaas:TypesDefinitions';
import { StoreCredentials } from "../../usecase/Credentials";
import getDataFromRepo from '../../utils/repo';

export const PushEvent: IController = {
  endpoint: '/api/v1/event/:eventID',
  method: 'post',
  handler: (req: Request, res: Response) => {
    const { eventID } = req.params

    if (eventID !== 'push') {
      return res.sendStatus(400)
    }

    let outcome: any = {}

    const repoName = environment.git.raw_endpoint + req.body.repository.full_name + '/master/'
    const modifiedFilesURL = req.body.head_commit.modified

    modifiedFilesURL.forEach(async (file: string) => {
      const values = file.split("/")
      const serviceName = values[0];
      const projectName = values[1];
      const environment = (values[2].split("."))[0];

      outcome = await getDataFromRepo(repoName + file)
      if (outcome.code === 200) {
        await StoreCredentials(req.app.container, serviceName, projectName, environment, outcome.data)
      } else {
        console.log('Something is wrong to get content from GITHUB: ', outcome)
      }
    });

    return res.json({
      outcome: 200,
      status: 'in process',
      data: 'check logs for more information!'
    })
  }
}