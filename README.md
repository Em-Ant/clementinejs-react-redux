# Clementine-React-Redux MERN Stack Boilerplate


## Overview

Clementine.js is a lightweight boilerplate for fullstack JavaScript development which utilizes MongoDB, Express and Node.js. The boilerplate errs on the side of transparency and simplicity, making it an ideal starting point for beginner and seasoned developers alike.

The original [Free Code Camp](http://www.freecodecamp.com) version by [@johnstonbl01](https://github.com/johnstonbl01) uses Angular 1.x as front-end framework.

I modified it to obtain a **MERN Stack** version which uses [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [React-router](https://github.com/reactjs/react-router) and includes Twitter authentication using [Passport](http://passportjs.org/).

It also features **server-side rendering**, with a basic authorization system.


# Quick Start Guide

### Prerequisites

In order to use Clementine-React-Redux, you must have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)
- [Git](https://git-scm.com/)

### Installation & Startup

To install Clementine-React-Redux, simply enter the below in the terminal window:

```bash
$ git clone https://github.com/Em-Ant/clementinejs-react-redux your-project
```

To install the dependencies, enter the following in your terminal:

```
$ cd your-project
$ npm install
```

This will install the Clementine-React-Redux components into the `your-project` directory.

### Setup Twitter Authentication

Create a new App [here](https://apps.twitter.com/) and get API keys / secrets.

### Local Environment Variables

Create a file named `.env` in the root directory. This file should contain:

```
TWITTER_CONSUMER_KEY=your-client-id-here
TWITTER_CONSUMER_SECRET=your-client-secret-here
MONGODB_URI=mongodb://localhost:27017/clementinejs
PORT=8080
APP_URL=http://localhost:8080/
```

### Starting the App

To start the app, make sure you're in the project directory and type `npm run serve` into the terminal. This will start the Node server and connect to MongoDB.

You should the following messages within the terminal window:

```
Node.js listening on port 8080...
```

Next, open your browser and enter `http://localhost:8080/`. Congrats, you're up and running!

### Build for production

Type `npm run build`. You'll get the minified bundles and the compiled es6
into the directory `./dist`

## Features

| Features           |
|:---------          |
| Isomorphic App     |
| MongoDB            |
| Express            |
| React              |
| Redux              |
| React-router       |
| ES6 - Babel        |
| Node.js            |
| Passport           |
| Mongoose           |
| ESLint - airbnb    |

## License

MIT License. [Click here for more information.](LICENSE.md)
