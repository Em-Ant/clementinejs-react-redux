const mongoose = require('mongoose');

const User = new mongoose.Schema({
  twitter: {
    id: String,
    displayName: String,
    username: String,
  },
  nbrClicks: {
    clicks: Number,
  },
});

export default mongoose.model('User', User);
