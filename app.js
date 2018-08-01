const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));

app.set('view engine', 'ejs');

const mainRoutes = require('./routes');

app.use(mainRoutes);

app.listen(8000, () => {
  console.log('App Movie Shop started');
});
