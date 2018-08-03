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
  },
  alphabet: {
    type: String,
    default: ''
  }
});

// CHAMPS VIRTUELS
// GETTERS
MovieSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

MovieSchema.set('toObject', {
  getters: true,
  virtuals: true
});

MovieSchema.virtual('test').get(function() {
  return this.name + ' est ' + this.gender;
});

//SETTERS
MovieSchema.virtual('alphabet_v').set(function(title) {
  this.alphabet =
    title.charAt(0).toUpperCase() + title.substring(1).toLowerCase();
});

//METHODS
MovieSchema.statics.findByGender = function(gender) {
  const Movie = this;

  return new Promise((resolve, reject) => {
    Movie.find({
      gender
    })
      .then(movies => {
        resolve(movies);
      })
      .catch(e => reject(e));
  });
};

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = { Movie };
