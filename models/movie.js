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
  },
  actors: [
    {
      lastname: {
        type: String,
        required: true,
        minlength: 1
      },
      firstname: {
        type: String,
        required: true,
        minlength: 1
      }
    }
  ],
  productors: [
    {
      lastname: {
        type: String,
        required: true,
        minlength: 1
      },
      firstname: {
        type: String,
        required: true,
        minlength: 1
      }
    }
  ]
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
// MovieSchema.virtual('alphabet_v').set(function(title) {
//   this.alphabet =
//     title.charAt(0).toUpperCase() + title.substring(1).toLowerCase();
// });

//METHODS

/**
 * findByGender
 * Trouve les films dans la catégorie
 * @param String gender
 * @return Int
 */
MovieSchema.statics.findByGender = function(gender) {
  const Movie = this;

  return new Promise((resolve, reject) => {
    Movie.find({
      gender
    })
      .then(movies => {
        console.log(movies);
        resolve(movies);
      })
      .catch(e => reject(e));
  });
};

/**
 * countByGender
 * Trouve le nombre de films dans la catégorie
 * @param String gender
 * @return Int
 */
MovieSchema.statics.countByGender = function(gender) {
  const Movie = this;

  return new Promise((resolve, reject) => {
    Movie.find({
      gender
    })
      .countDocuments()
      .then(count => {
        resolve(count);
      })
      .catch(e => reject(e));
  });
};

MovieSchema.methods.registerActors = function(actor) {
  return new Promise((revolve, reject) => {
    this.actors.push(actor);
    this.save()
      .then(movie => {
        revolve(movie);
      })
      .catch(e => {
        reject(e);
      });
  });
};

MovieSchema.methods.registerProductors = function(productor) {
  return new Promise((resolve, reject) => {
    this.productors.push(productor);
    this.save()
      .then(movie => {
        resolve(movie);
      })
      .catch(e => {
        reject(e);
      });
  });
};

MovieSchema.methods.deleteActors = function(id) {
  return new Promise((resolve, reject) => {
    this.actors = this.actors.filter(actor => {
      console.log('ID PARAMETRE FUNCTION', id);
      console.log('ACTOR. ID', actor._id);
      return id != actor._id;
    });
    this.save()
      .then(movie => {
        resolve(movie);
      })
      .catch(e => {
        reject(e);
      });
  });
};

MovieSchema.pre('save', function(next) {
  if (this.isModified('name') || this.isNew) {
    this.alphabet = this.name.charAt(0).toUpperCase();
    next();
  } else {
    next();
  }
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = { Movie };
