<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="70" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ npm install
```


## Running docker

```bash
# up with build
$ docker compose up --build

# up with detached mode 
$ docker compose up -d

# down the app
$ docker compose down
```

## Running kubernetes

```bash
# create namespace orderly
$ kubectl create ns orderly

# set orderly namespace to default
$ kubectl config set-context --current --namespace=orderly

# cache
$ kubectl apply -f k8s/cache

# database
$ kubectl apply -f k8s/db

# api
$ kubectl apply -f k8s/api
```

<p align="center">
  <a target="blank"><img src="./docs/images/k8s-cloud.png" width="700" alt="Kubernetes diagram on google cloud platform" style="border-radius:10px;" /></a>
</p>


## Entity Relationship Diagram - Database

<p align="center">
  <a target="blank"><img src="./docs/images/er-diagram.png" width="700" alt="Entity Relationship Diagram" style="border-radius:10px;" /></a>
</p>

## Domain Driven Design - Context Map

<p align="center">
  <a target="blank"><img src="./docs/images/context-map.png" width="1000" alt="Entity Relationship Diagram" style="border-radius:10px;" /></a>
</p>