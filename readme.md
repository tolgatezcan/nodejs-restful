# NodeJS + Express + MongoDB with JWT Authentication

Produces random hash with jwt in simple level and log hash operations using monolog.

## Getting Started

- Clone this repo or download it's release archive and extract it somewhere
- You may delete `.git` folder if you get this code via `git clone`
- Run `npm install`
- Configure your `.env` file for authenticating via database
- Create a table from the `users` name in the database (Includes email and password fields)

#### Run a NodeJS built in server from your root project

```sh
node server.js
```
or run with PM2
```sh
pm2 start process.json
```

#### Register Request (POST Method):

```sh
curl -i http://localhost:8080/register -d email=web@web.com -d password=123
```

#### Register Response:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJlbWFpbCI6IndlYjNAd2ViLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiX2lkIjoiNWQ2YWI1MWMzNGFjZjcyOTI0NWRkMmFlIn1dLCJpYXQiOjE1NjcyNzQyNjgsImV4cCI6MTU2NzI3NjA2OH0.MKn6qnoOz0dUl3RJjUlE8KVJiHXyFTCemxdvLgiyOPk"
}
```

#### Login Request (POST Method):

```sh
curl -i http://localhost:8080/login -d email=web@web.com -d password=123
```

#### Login Response:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVkNmFiNTFjMzRhY2Y3MjkyNDVkZDJhZSIsImVtYWlsIjoid2ViM0B3ZWIuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYifSwiaWF0IjoxNTY3Mjc0Mjg5LCJleHAiOjE1NjcyNzYwODl9.ct642RKtFiVR-zHLeMZUiujiDxy8k2EMpD5dRDigJC0"
}
```

#### Hast Request (GET Method):

```sh
curl -H "Authorization: Bearer <token>" http://localhost:8080/hash
```

#### Hash Response:

```
{
  "hash": "63da997f34e3bc4ef63ccec126665bc6d9f99b55"
}
```