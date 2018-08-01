const express = require('express');
const router = express.Router();
const movies = require('../data/data.json');

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

router.get('/:id(\\d+)', (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(movies[id]);
  // (\\d+) -- n'accepte que les nombres, Cannot GET /ddd si lettres
  res.render('film');
});

module.exports = router;
