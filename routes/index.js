//MODULES
const express = require('express');
const router = express.Router();
const _ = require('lodash');
//DATA
const movies = require('../data/data.json');

/**
 * Home
 * Renvoie la page home avec les datas
 * @method GET
 * @param none
 * @return datas
 */
router.get('/movies', (req, res) => {
  const data = {
    movies
  };

  // Render /views/movies.ejs
  res.render('movies', data);
});

/**
 * ListMovies
 * Liste des films en cours dans le magasin
 * @method GET
 * @param void
 * @return JSON movies
 */
router.get('/apimovies', (req, res) => {
  res.json(movies);
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

  const movie = movies.filter(movie => {
    return movie.id == req.params.id;
  })[0];

  // Render /views/movie.ejs
  res.render('movie', { movie });
});

/**
 * Delete movie
 * Renvoie le tableau de movie sans l'id dans le req.params
 * @method DELETE
 * @param Int id
 * @return movie
 */
router.delete('/movies/:id', (req, res) => {
  const { params } = req;
  const { id } = params;

  const movie = movies.filter(movie => {
    return movie.id != req.params.id;
  });

  res.send(console.log('ID :', id));
  res.send(console.log('ARRAY WITHOUT ID :', movie));
});

module.exports = router;
