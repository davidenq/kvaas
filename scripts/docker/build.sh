#!/bin/sh

docker build --file=./build/package/docker/Dockerfile \
--compress --force-rm --rm --tag ${TAG_DOCKER_IMAGE} .