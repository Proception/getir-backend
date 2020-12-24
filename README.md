# Getir Backend API

This is a backend application that has an endpoint to filter records stored in a mongodb database. It is a javascript application that uses the following tools;

- Node
- Express
- Jest
- Mongoose
- TypeScript
- Swagger

## How can I set this app up locally?

- Install NodeJS
- Install NPM or Yarn
- clone the repository using `git clone https://github.com/Proception/getir-backend.git`
- change directory into getir-backend and run;
  - `npm i`
  - `npm run start`

## How can I run the tests on this app?

- run `npm test`

### API Endpoints

The app has a single endpoint for consuming the records from the mongodb database. The endpoint uses a combination of 4 parameters `startDate`, `endDate`, `minCount` and `maxCount`. These parameters determine the filtered results. the response object received. It also has another endpoint for the swagger documentation and you can access the app endpoints using the Swagger api url below

`https://getir-backend-test.herokuapp.com/api-docs/`

## How do I access the records API end point?

### Sample Request Payload
```
POST /api/v1/records
Content-Type: application/json
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```
### Sample Response Payload
```
{
  "code": 0,
  "msg": "Success",
  "records": [
    {
      "key": "jOjBYTLV",
      "createdAt": "2016-11-13T19:54:23.677Z",
      "totalCount": 2954
    },
    {
      "key": "fEWwrjug",
      "createdAt": "2016-10-30T22:49:27.236Z",
      "totalCount": 2935
    },
    {
      "key": "plSuXweN",
      "createdAt": "2016-10-25T11:36:28.069Z",
      "totalCount": 2970
    }
  ]
}
```
