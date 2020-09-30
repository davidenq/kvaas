import yaml from 'js-yaml';
const getDataFromRepo = (data: string) => {
  let content = yaml.safeLoad(data);
  return JSON.parse(JSON.stringify(content))
}

export default getDataFromRepo;