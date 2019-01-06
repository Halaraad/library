const express = require('express');
const app = express();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const compression = require('compression');
const multer = require('multer')
const config = require('./DB.js');
const libraryRoute = require('./routes/library');

const PORT = process.env.PORT || 7000

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('\x1b[36m%s\x1b[0m', 'Library Database is connected') },
  err => { console.log('Can not connect to library database'+ err)}
);

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/library', libraryRoute);

app.get('/', (req, res) => {
    res.send('Welcome to Library');
  });

app.listen(PORT, () => {
  console.log(`Server for library is running on Port: ${PORT}`);
});