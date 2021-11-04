<h1 align="center"> Senefreelance </h1> <br>

<p align="center">
  Senefreelance is an advertising portal where you can find freelancers, assign them tasks. 
  This project was built using microserive architecture.
</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Testing](#testing)
- [API](#requirements)
- [Acknowledgements](#acknowledgements)


## Introduction

Senefreelance is an advertising portal where you can find freelancers, assign them tasks. 
This project was built using microserive architecture.

## Features

Senefreelance:  Description of features 
* authentication and authorization with JWT token
* Create, read, update of freelancer profile
* Create, read, update, delete of order
* expiration of order
* payment of order

## Requirements
This application can on a local or remote kubernetes cluster

### NodeJs
NodeJs installalation in all microservices is necessary in order to run the project

### Docker
* [Docker](https://www.docker.com/get-docker)
* [Kubernetes](https://kubernetes.io)

### Skaffold 
it's necessary in order to automatically sync all changes, build the image and deploy it in the cluster
* [skaffold](https://skaffold.dev)


## Quick start
Make sure the JWT and Stripe key are configured, then you can run the server on your local or remote cluster.

``` 
skaffold dev
```

## Testing

Automate testing were done using Jest. In order to run the test you can navigate in a particular microserive and run the following command
```
npm run test 
```

## Api 

