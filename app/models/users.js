
import mongoose, { Schema } from 'mongoose';

const User = new Schema({
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
