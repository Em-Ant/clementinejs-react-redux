
import Users from '../models/users.js';

function ClickHandler() {
  this.getClicks = (req, res) => {
    Users
			.findOne({ 'twitter.id': req.user.twitter.id }, { _id: false })
      .exec((err, result) => {
        if (err) { throw err; }
        res.json(result.nbrClicks);
      });
  };

  this.addClick = (req, res) => {
    Users
    .findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
      { $inc: { 'nbrClicks.clicks': 1 } })
    .exec((err, result) => {
      if (err) { throw err; }
      res.json(result.nbrClicks);
    });
  };

  this.resetClicks = (req, res) => {
    Users
			.findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
        { 'nbrClicks.clicks': 0 })
      .exec((err, result) => {
        if (err) { throw err; }
        res.json(result.nbrClicks);
      });
  };
}

module.exports = ClickHandler;
