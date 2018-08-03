const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://marlow:Ageofempires3@ds111072.mlab.com:11072/movieshop',
  { useNewUrlParser: true }
);

module.exports = { mongoose };
