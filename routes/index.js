//MODULES
const express = require('express');
const router = express.Router();
const _ = require('lodash');
//DATA
//const movies = require('../data/data.json');
//MODELS
const { Movie } = require('../models/movie');

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
router.get('/apimovies', (req, res) => {
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
router.get('/movies/:id', (req, res) => {
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
router.post('/movies', (req, res) => {
  const { body } = req;
  const data = _.pick(body, ['name', 'gender', 'date', 'synopsis']);

  const movie = new Movie(data);

  movie
    .save()
    .then(movie => {
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
router.get('/movies/:id/delete', (req, res) => {
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
router.post('/movies/:id/update', (req, res) => {
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
