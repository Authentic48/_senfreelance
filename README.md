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


## Signup 
### Request 
`POST '/api/users/signup'`
### Response

``` 
cookie: {jwt: 'token'}
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
}
```
## Signin
### Request 
`POST '/api/users/signin'`
### Response

``` 
cookie: {jwt: 'token'}
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
}
```
## Signout 
### Request 
`POST '/api/users/signout'`
### Response

``` 
{}
```
## Current-user 
### Request 
`GET '/api/users/current-user'`
### Response

``` 
cookie: {jwt: 'token'}
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
}
```
## Freelancer
## New 
### Request 
`POST '/api/freelancers/new'`
### Response

``` 
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
 'phone': 'phone number',
 'bio': 'bio description',
 'Profession': 'profession',
 'userId': 'user-id'
}
```

## Index 
### Request 
`GET '/api/freelancers/'`
### Response

``` 
[
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
 'phone': 'phone number',
 'bio': 'bio description',
 'Profession': 'profession'
}
]
```
## Show 
### Request 
`GET '/api/freelancers/:id'`
### Response

``` 
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
 'phone': 'phone number',
 'bio': 'bio description',
 'Profession': 'profession',
 'userId': 'user-id'
}
```
## Update 
### Request 
`PUT '/api/freelancers/:id'`
### Response

``` 
{
 'id': 'id',
 'name': 'name',
 'email': 'email',
 'phone': 'phone number',
 'bio': 'bio description',
 'Profession': 'profession',
 'userId': 'user-id'
}
```
## Order
## New 
### Request 
`POST '/api/orders/'`
### Response

``` 
{
      status: 'status',
      userId: 'user-id',
      task: 'task description',
      freelancer: {
        'id': 'id',
        'name': 'name',
        'email': 'email',
        'phone': 'phone number',
        'bio': 'bio description',
        'Profession': 'profession',
        'userId': 'user-id'
      },
      expiresAt: '421841284',
      price: price,
      version: version
}
```
## Show 
### Request 
`GET '/api/orders/:id'`
### Response

``` 
{
      status: 'status',
      userId: 'user-id',
      task: 'task description',
      freelancer: {
        'id': 'id',
        'name': 'name',
        'email': 'email',
        'phone': 'phone number',
        'bio': 'bio description',
        'Profession': 'profession',
        'userId': 'user-id'
      },
      expiresAt: '421841284',
      price: price,
      version: version
}
```
## Cancel 
### Request 
`PUT '/api/orders/:id'`
### Response

``` 
{
      status: 'cancelled',
      userId: 'user-id',
      task: 'task description',
      freelancer: {
        'id': 'id',
        'name': 'name',
        'email': 'email',
        'phone': 'phone number',
        'bio': 'bio description',
        'Profession': 'profession',
        'userId': 'user-id'
      },
      expiresAt: '421841284',
      price: price,
      version: version
}
```
## Index 
### Request 
`POST '/api/orders/'`
### Response

``` 
[
{
      status: 'status',
      userId: 'user-id',
      task: 'task description',
      freelancer: {
        'id': 'id',
        'name': 'name',
        'email': 'email',
        'phone': 'phone number',
        'bio': 'bio description',
        'Profession': 'profession',
        'userId': 'user-id'
      },
      expiresAt: '421841284',
      price: price,
      version: version
},
]
```
## Payment
`POST '/api/payments/'` 
### Response 
```
{
    'id': 'payment-id',
    'orderId': 'order-id'
}
```
