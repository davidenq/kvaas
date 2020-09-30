const internals = {
  SUPPORTED_STORAGE: {
    MONGO: {
      PROTOCOL: 'mongodb://',
      NAME: 'mongo'
    },
    MYSQL: {
      PROTOCOL: 'mysql://',
      NAME: 'mysql'
    }
  },
  SERVER: {
    HEALTH_ENDPOINT: '/health'
  }
}

export default internals;