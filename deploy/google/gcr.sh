#!/bin/bash


gcloud run deploy kvaas-dev --image ${TAG_DOCKER_IMAGE} --region us-east1 --platform managed --allow-unauthenticated