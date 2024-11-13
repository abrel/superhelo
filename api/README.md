# Setup

## Install dependencies

```sh
yarn
```

## Start local api

```sh
yarn dev
```

# Deploiement (API)

## Build docker image

```sh
docker build --build-arg SHA1=$(git rev-parse HEAD) -t api .
```

## Run docker image

```sh
docker run -d --name api -p 3000:3000 api
```

## Tag docker image

```sh
docker tag api 381492223258.dkr.ecr.eu-west-3.amazonaws.com/api
```

## Push docker image

```sh
aws ecr get-login-password --region eu-west-3 --profile superhelo | docker login --username AWS --password-stdin 381492223258.dkr.ecr.eu-west-3.amazonaws.com
```

```sh
docker push 381492223258.dkr.ecr.eu-west-3.amazonaws.com/api
```

# Deploiement (CRON)

## Build docker image

```sh
docker build --build-arg SHA1=$(git rev-parse HEAD) -f Dockerfile-cron -t cron .
```

## Run docker image

```sh
docker run -d --name cron cron
```

## Tag docker image

```sh
docker tag cron 381492223258.dkr.ecr.eu-west-3.amazonaws.com/cron
```

## Push docker image

```sh
aws ecr get-login-password --region eu-west-3 --profile superhelo | docker login --username AWS --password-stdin 381492223258.dkr.ecr.eu-west-3.amazonaws.com
```

```sh
docker push 381492223258.dkr.ecr.eu-west-3.amazonaws.com/cron
```
