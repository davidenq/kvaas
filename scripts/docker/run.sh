#!/bin/bash

if [ "$PORT" == "" ]; then
  PORT=3000
fi
if [ "$NODE_ENV" == "" ]; then
  NODE_ENV=develop
fi

docker run -e PORT=${PORT}  -e NODE_ENV=${NODE_ENV} -p ${PORT}:${PORT}  -d -t -i --name kvaas-dev kvaas-dev