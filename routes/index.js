const express = require('express');
const router = express.Router();
const movies = require('../data/data.json');

const _ = require('lodash');

router.get('/', (req, res) => {
  // Route home de l'application
  const data = {
    movies
  };
  res.render('layout', data);
  //res.render('layout');
});

router.get('/listMovies', (req, res) => {
  res.json(data);
});

router.get('/:id', (req, res) => {
  const { params } = req;
  const { id } = params;

  /**
   * Filter movie
   * Renvoie l'objet movie avec l'id movie == params.id
   * @method GET
   * @param Int id
   * @return movie
   */

  const movie = movies.filter(movie => {
    return movie.id == req.params.id;
  })[0];

  console.log(movie);
  res.render('film', { movie });
});

module.exports = router;
