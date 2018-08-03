const authentificate = (req, res, next) => {
  console.log('Hello middleware');
  next();
  //console.log(req);
  //res.redirect('/movies');
};

module.exports = { authentificate };
