
const env = process.env.NODE_ENV !== 'production' ? require('dotenv') : null;
if (env) env.load();

module.exports = {
  twitterAuth: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: `${process.env.APP_URL}auth/twitter/callback`,
  },
};
