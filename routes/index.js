//MODULES
const express = require('express');
const router = express.Router();
const _ = require('lodash');
//DATA
//const movies = require('../data/data.json');
//MODELS
const { Movie } = require('../models/movie');
//MIDLEWARE
const { authentificate } = require('../middleware/authentificate');

/**
 * Home
 * Renvoie la page home avec les datas
 * @method GET
 * @param none
 * @return datas
 */
router.get('/movies', (req, res) => {
  Movie.find({})
    .then(movies => res.render('movies', { movies }))
    .catch(e => {
      console.log('Error', e);
    });
});

/**
 * ListMovies
 * Liste des films en cours dans le magasin
 * @method GET
 * @param void
 * @return JSON movies
 */
router.get('/apimovies', authentificate, (req, res) => {
  Movie.find({})
    .sort({ id: 1 })
    .then(movies => res.json(movies))
    .catch(err => res.send(err));
});

/**
 * Filter movie
 * Renvoie l'objet movie avec l'id movie == params.id
 * @method GET
 * @param Int id
 * @return movie
 */
router.get('/movies/:id', authentificate, (req, res) => {
  const { params } = req;
  const { id } = params;

  Movie.findOne({ _id: id })
    .then(movie => {
      // Render /views/movie.ejs
      res.render('movie', { movie });
    })
    .catch(e => {
      console.log('error', e);
    });
});

/**
 * Add Movie
 * Ajoute un film dans la bdd
 * @method POST
 * @param void
 * @return save movie
 */
router.post('/movies', authentificate, (req, res) => {
  const { body } = req;
  const data = _.pick(body, ['name', 'gender', 'date', 'synopsis']);

  const movie = new Movie(data);
  movie.alphabet_v = movie.name;

  movie
    .save()
    .then(movie => {
      console.log(movie);
      res.redirect('/movies/' + movie._id);
    })
    .catch(e => {
      console.log('error : ', e);
    });
});

/**
 * Delete movie
 * Supprime le film, et redirige vers home
 * @method GET
 * @param Int id
 * @return movie
 */
router.get('/movies/:id/delete', authentificate, (req, res) => {
  const { params } = req;
  const { id } = params;
  console.log(id);

  Movie.findOneAndDelete({ _id: id })
    .then(movie => {
      res.redirect('/movies');
    })
    .catch(e => {
      console.log('error', e);
    });
});

/**
 * Update movie
 * Met à jour le film séléctionné
 * @method POST
 * @param Int id
 * @return movie updated
 */
router.post('/movies/:id/update', authentificate, (req, res) => {
  const { body } = req;

  const data = _.pick(body, ['name', 'gender', 'date', 'synopsis']);

  Movie.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true }) // if no New: true => renvoie l'objet de base, le mettre pour renvoyer l'objet modifié
    .then(movie => {
      res.render('movie', { movie });
      console.log('movie', movie);
    })
    .catch(e => {
      console.log('error', e);
    });
});

/**
 * Search categories
 * Trouve les films par catégories
 * @method GET
 * @param void
 * @return movies in categories
 */
router.get('/categories', authentificate, (req, res) => {
  Movie.findByGender('amour')
    .then(movies => {
      res.render('movies', { movies });
    })
    .catch(e => {
      console.log('error', e);
    });
});

/**
 * Count films in categories
 * Count des films dans la categorie
 * @method GET
 * @param String gender
 * @return Int
 */
router.get('/:gender/count', authentificate, (req, res) => {
  const { params } = req;
  const { gender } = params;

  Movie.countByGender(gender)
    .then(count => {
      res.send('count ' + count);
      console.log(count);
    })
    .catch(e => {
      console.log(e);
    });
});

/**
 * Add actors
 * ajout du first et du lastname dans un film
 * @method GET
 * @param Object actors
 * @return movie
 */
router.get('/movie/actors', (req, res) => {
  const id = '5b641610d746600e86385cc4';

  // Get movie before add actors
  Movie.findOne({ _id: id })
    .then(movie => {
      console.log(movie);
      // Add actors studio
      movie
        .registerActors({
          lastname: 'COUCOU COUCOU',
          firstname: 'HHAHAHAHHAA'
        })
        .then(movie => {
          res.send(movie);
        })
        .catch(e => {
          res.status(404).send('Cannot add actor');
        });
    })
    .catch(e => {
      console.log(e);
    });
});

/**
 * Delete actors
 * Supression d'un actor avec l'id
 * @method GET
 * @param int id
 * @return movie with actors filtered
 */
router.get('/movie/deleteActors', (req, res) => {
  const id = '5b641610d746600e86385cc4';

  const idActorsDeleted = '5b646978d7ce0f3306376aa3';

  Movie.findOne({ _id: id }).then(movie => {
    console.log('MOVIE', movie);
    movie
      .deleteActors(idActorsDeleted)
      .then(actors => {
        res.send(actors);
      })
      .catch(e => {
        res.status(404).send('Cannot delete actor');
      });
  });
});

/**
 * Add productors
 * ajout du first et du lastname dans un film d'un productor
 * @method GET
 * @param Object productors
 * @return movie
 */
router.get('/movie/productors', (req, res) => {
  const id = '5b641610d746600e86385cc4';

  Movie.findOne({ _id: id })
    .then(movie => {
      console.log(movie);
      movie
        .registerProductors({
          lastname: 'Marlot',
          firstname: 'Tanguy'
        })
        .then(movie => {
          res.send(movie);
        })
        .catch(e => {
          res.status(404).send('Cannot add productor');
        });
    })
    .catch(e => {
      console.log(e);
    });
});

/**
 * test
 * TEST
 * @method GET
 * @param void
 * @return ALL METHODS UPDATE, DELETE,
 */
router.get('/test', (req, res) => {
  // const movie = new Movie({
  //   name: 'le film a supprimé',
  //   synopsis: 'test powa',
  //   genre: 'boum',
  //   date: '1986-07-23'
  // });

  // movie
  //   .save()
  //   .then(movie => {
  //     console.log('Movie saved');
  //   })
  //   .catch(e => {
  //     console.log('error : ', e);
  //   });

  // Movie.find({})
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(e => {
  //     console.log('error', e);
  //   });

  // Movie.findOne({ _id: '5b62f65466c6852058040a40' })
  //   .then(movie => {
  //     console.log(movie);
  //   })
  //   .catch(e => {
  //     console.log('error', e);
  //   });

  const id = '5b62fadf1e8087227786d602';

  // const data = { name: 'LOURD CA MARCHE' };
  //
  // Movie.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }) // if no New: true => renvoie l'objet de base, le mettre pour renvoyer l'objet modifié
  //   .then(movie => {
  //     console.log(movie);
  //   })
  //   .catch(e => {
  //     console.log('error', e);
  //   });

  Movie.findOneAndDelete({ _id: id }) // if no New: true => renvoie l'objet de base, le mettre pour renvoyer l'objet modifié
    .then(movie => {
      console.log(movie);
    })
    .catch(e => {
      console.log('error', e);
    });

  //findOne => renvoie UN SEUL objet
  //find => renvoie un tableau d'objet même si il y en a qu'un
});

module.exports = router;
