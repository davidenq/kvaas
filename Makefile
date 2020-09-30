.PHONY: build deploy

dev:
	@npm run dev

build:
	@npm run build

clean:
	@npm run clean

DOCKER_IMAGE_NAME=gcr.io/oauth-ppm/kvaas-test
export DOCKER_IMAGE_NAME := ${DOCKER_IMAGE_NAME}
export HASH_LAST_COMMIT := $(shell git rev-parse --short HEAD)
export TAG_DOCKER_IMAGE := ${DOCKER_IMAGE_NAME}:${HASH_LAST_COMMIT}

docker-build:
	@sh ./scripts/docker/build.sh

docker-run:
	@sh ./scripts/docker/run.sh

docker-publish:
	@sh ./scripts/docker/publish.sh

deploy-on-gcr : docker-build docker-publish
	@sh ./deploy/google/gcr.sh

deploy-update :
	@sh ./deploy/google/gcr.sh

include .env
mongo-run:
	@docker run -e MONGO_INITDB_ROOT_USERNAME=${DATABASE_USERNAME} -e MONGO_INITDB_ROOT_PASSWORD=${DATABASE_PASSWORD} -e MONGO_INITDB_DATABASE={DATABASE_NAME} -v ${PWD}/docker-volumen/mongo:/data/db --rm -p 27017:27017 --name kvaas-mongo -d mongo:latest
mongo-stop:
	@docker stop kvaas-mongo
mongo-migrate:
	@npm run migrate:mongo