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
or PM2
```sh
pm2 start process.json
```

#### Register Request (POST Method):

```sh
curl -i http://localhost:8000/register -d email=web@web.com -d password=123
```

#### Register Response:

```
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE1NTc2NzA3NTMsImV4cCI6MTU1NzY3NDM1MywibmJmIjoxNTU3NjcwNzUzLCJqdGkiOiJSNnNnWmF6TGZCZjdYREhWIiwic3ViIjoxNSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.GHygZdoPweMeuvz6AdpCmRIdjdmj1hSEJVZUAGzPalE"
}
```

#### Login Request (POST Method):

```sh
curl -i http://localhost:8000/login -d email=web@web.com -d password=123
```

#### Login Response:

```
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvbG9naW4iLCJpYXQiOjE1NTc2NzA3NTMsImV4cCI6MTU1NzY3NDM1MywibmJmIjoxNTU3NjcwNzUzLCJqdGkiOiJSNnNnWmF6TGZCZjdYREhWIiwic3ViIjoxNSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.GHygZdoPweMeuvz6AdpCmRIdjdmj1hSEJVZUAGzPalE"
}
```

#### Hast Request (GET Method):

```sh
curl -H "Authorization: Bearer <token>" http://localhost:8000/hash
```

#### Hash Response:

```
{
  "hash": "03669a578e1c8a128ab29b1465ef8f21"
}
```