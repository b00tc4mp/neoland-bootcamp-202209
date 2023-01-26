# Cheap Move

## Intro

This App is based on a price comparison of the main VTC services

## Functional Description

Compare the prices of the different VTC applications to choose the cheapest

### Use Cases

User
- Search destiny & View comparative
- View profile
- Change password
- ...

## Technical Description

It is an application that, through an API generated with the help of PUPPETER, gets into my VTC service user to get the best price.

### Data Model

User
- name (String, required)
- email (String, required, unique)
- password (String, required)

ServiceType
- name

Service
- user (ObjectId, ref User)
- type (ObjectId, ref ServiceType, required)
- username (String, required)
- password (String, required)