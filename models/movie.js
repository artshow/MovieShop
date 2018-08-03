const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  gender: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    minlength: 1
  },
  synopsis: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = { Movie };
