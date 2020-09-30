import { StatusOperation } from '@kvaas:TypesDefinitions';
import fetch from 'node-fetch'
import yaml2json from './yaml2json';
const getDataFromRepo = async (endpoint: string): Promise<StatusOperation> => {

  try {
    const response = await fetch(endpoint)
    const info = await response.text()
    if (info === '404: Not Found') {

      return {
        status: 'not found',
        code: 404,
        data: 'Content not found'
      }
    } else {
      const dataJSON = yaml2json(info)
      return {
        status: 'ok',
        code: 200,
        data: dataJSON
      }
    }
  } catch (error) {
    return {
      status: 'error',
      code: 500,
      data: error
    }
  }
}

export default getDataFromRepo;