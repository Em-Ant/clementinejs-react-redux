
import express from 'express';
import routes from './app/routes';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';

const env = process.env.NODE_ENV !== 'production' ? require('dotenv') : null;
if (env) env.load();

console.log(process.env);

import passportConfig from './app/config/passport';
passportConfig(passport);

const app = express();

mongoose.connect(process.env.MONGODB_URI ||
  process.env.MONGO_URI || process.env.MONGOLAB_URI);

app.use('/', express.static(`${process.cwd()}/public`));

const configHotReloading =
  process.env.NODE_ENV === 'development' && !process.env.DISABLE_WEBPACK
  ? require('./app/config/hotReload') : null;

if (configHotReloading) configHotReloading(app);

app.use(session({
  secret: process.env.SECRET_SESSION || 'secretClementine',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

const port = process.env.PORT || 8080;
app.listen(port, error => {
  /* eslint-disable no-console */
  if (error) console.log(error);
  console.log(`Node.js listening on port ${port}...`);
  /* eslint-enable no-console */
});
