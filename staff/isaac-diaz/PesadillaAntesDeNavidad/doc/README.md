# NFT Need For Tuition

## Intro

This App is for view the state of your cars

![](https://i.giphy.com/media/14rk56liuv7mQo/giphy.webp)

## Functional Description

Create your vehicle card and look the status to be safe in the road. 

### Use Cases

User
- View list of vehicles (brand, model, license, licenseDate,   kms, nextinspectOil, nextItv, tyrepressure)
- View a vehicle (full detail, state, ...)
- Create a vehicle
- Update a stadistics vehicle
- Delete a vehicle
- View status vehicle
- View next inspect oil
- View next Inspection technical

## Technical Description

### Blocks

```
App (client-side)        API (server-side)       DB
[React > logic > xhr] -> [Express > Mongoose] -> [Mongo]

### Data Model

User
- name (String, required)
- email (String, required, unique)
- password (String, required)

Vehicle
- user (ObjectId, required)
- brand (String, required)
- model (String, required)
- fuelType (String, enum: ['car', 'moto'])
- license (String, required, unique)
- licenseDate (Date, required)
- kms (String, required)
- lastCheckOilDate (Date)
- lastCheckOilKms (Number)
- tyrePressureFront (String, required)
- tyrePressureRear (String, required)

Tecnologies

- JavaScript
- React
- Node
- Mongoose
- Mongodb
- Tailwind
- Express

__BACKLOG__

- Create new parameters to inspect(timing belt and distribution chain).
- Push your frame car and chasis number for buy components car.
- Page info(photo engine, teach parts basics engine, explain).
- Testing.
- Change TarjetVehicle to CardVehicle and pass to create home directly.

TODO

- Settings.
- Change email and password.

__DOING__ 

- Improve styles

__DONE__






