<p align="center">
    <h1 align="center">Study Angular Project</h1>
    <br>
</p>

A small blog site with the ability to register new users, add and view posts. And also with the ability to subscribe to existing users
Installation
------------
INSTALLATION
------------

- Make directory and clone the repository via following commands
~~~
mkdir dirname
cd dirname
~~~
~~~
https://github.com/ZuevR/learn-angular-and-nodejs.git .
~~~
- Then You should install required dependencies
~~~
 npm --prefix app-api install && npm --prefix app-ui install
~~~

If you do not have [npm](https://www.npmjs.com/), you may install Node.js by following the instructions
at [nodejs.org](https://nodejs.org).

CONFIGURATION
-------------

### Database
- Create new database

- Edit the file `app-api/config/config.json` with real data:

```json
{
  "development": {
    "username": "user",
    "password": "******",
    "database": "your_database_name",
    "host": "localhost",
    "dialect": "postgres"
  }
}

```
Initialization
-------------
### Database

Run the migration script to create the database structure
~~~
cd app-api
npm run migrate
~~~

Launching
-------------
Run the command being in the root folder of the project
~~~
npm start --prefix app-api & npm start --prefix app-ui
~~~
Now you can find a working site at http://localhost:4200/
