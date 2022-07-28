const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const errorHandler = require('./middlewares/errorHandler');
const setHeaders = require('./middlewares/setHeaders');


require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(setHeaders);

server.use('/', routes);

server.get('/', (req, res) => {
  res.send('Home-Back de PokeWeb de David');
})

// Error catching endware - Control de errores.
server.use(errorHandler);

module.exports = server;