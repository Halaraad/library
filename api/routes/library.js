const express = require('express');
const libraryRoutes = express.Router();
const multer = require('multer');
const path   = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const uuidv1 = require('uuid/v1');
const Book = require('../models/book');
const User = require('../models/user');
const cors = require('cors')
const auth =  require('../middleware/auth');

var corsOptions = {
  origin: ['http://localhost:7000', 'http://localhost:1234'],
  optionsSuccessStatus: 200,
  headers: 'Authorization'
}

var storage = multer.diskStorage({
  
  destination: (req, file, cb) => {

    var filetypes = /jpeg|jpg|png/;
    var filetypes2 = /pdf/;
    var mimetype = filetypes.test(file.mimetype);
    var mimetype2 = filetypes2.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    var extname2 = filetypes2.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      cb(null, './public')
    } else if (mimetype2 && extname2) {
      cb(null, './public/')
    } else {
      cb({ error: 'Mime type not supported' })
    }
  },

  filename: (req, file, cb) => {

    var filetypes = /jpeg|jpg|png/;
    var filetypes2 = /pdf/;
    var mimetype = filetypes.test(file.mimetype);
    var mimetype2 = filetypes2.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    var extname2 = filetypes2.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    } else if (mimetype2 && extname2) {
      cb(null,"files/FILE-" + Date.now() + path.extname(file.originalname));
    } else {
      cb({ error: 'Mime type not supported' })
    }
  }
})

var upload =  multer({
  storage: storage
  // limits: { fileSize:5000000 }
}).fields([
  {name: "myImage"},
  {name: "myFile"}
]);

libraryRoutes.get('/', (req, res) => {
  Book.find()
  .sort({ timestamps : -1 })
  .then(books => {
    res.status(200).send(books);
  }).catch(err => {
    res.status(400).send('error 400')
  })
});

libraryRoutes.post('/register', (req, res) => {
  bcrypt.genSalt(10).then(salt => {
    bcrypt.hash(req.body.password, salt).then(hashed => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: hashed,
        email: req.body.email,
        admin: false
      });
      user.save().then(result => {
        const token = jwt.sign({_id: result._id, exp: Date.now() + 1000 * 60 }, 'key');
        var obj = {
          token: token,
          admin: false
        }
        res.header({'Authorization': token}).json(obj);
        res.send()
      }).catch(err => { console.log('err3') })
    }).catch(err => { console.log('err2') })
  }).catch(err => { console.log('err1') })
});

libraryRoutes.post('/login', (req, res) => {

  const validating = userValidating(req.body);

  if(validating.error){
    res.status(400).send(validating.error);
  } else {
    User.findOne({email: req.body.email})
    .then(result => {
      
      bcrypt.compare(req.body.password, result.password, function(err, response) {

        if(response){ 
          const token = jwt.sign({ "_id": result._id }, 'key');

          var obj = {
            token: token,
            admin: result.admin
          }
          res.header({'Authorization': token}).json(obj);
          res.send()
        } else {
          res.status(400).send('you have tried an incorect credentials');
        }
      });
    }).catch(err => {
      res.status(404).send('there is no such user');
    });
  }
});


libraryRoutes.post('/checKlogin', cors(corsOptions), (req, res) => {
  const token = req.headers.authorization;

  if(token){
    res.header({'Authorization': 'token'}).send('token');
  }
  else 
  res.send('errrrrror')
})

libraryRoutes.post('/create', upload, (req, res, next) => {
  var file = req.files;
  let book = new Book
  book.book_title = req.body.title
  book.author = req.body.author
  book.date = req.body.date
  book.img = req.files.myImage[0].filename
  book.file = req.files.myFile[0].filename
  book.save()
    .then(book => {
      res.status(200).send({'book': 'Book is added successfully'});
    })
    .catch(err => {
      res.status(400).send({'book': 'Unable to save book to database'});
    });
});

libraryRoutes.get('/edit/:id', (req, res) => {
  Book.findById(req.params.id).then(book => {
    res.status(200).send(book);
  })
  .catch(err => {
    res.status(404).send('Book is not found');
  });
});

libraryRoutes.post('/update/:id', (req, res) => {
    Book.findById(req.params.id)
    .then(book => {
      if(!book)
      res.status(404).send('Book is not found');
      else {
        book.book_title = req.body.title;
        book.author = req.body.author;
        book.date = req.body.date;
        book.save().then(book => {
          res.status(200).send('Update book complete');
        })
        .catch(err => {
          res.status(400).send("unable to update book to the database");
        });
      } 
    })
    .catch(err => {
      res.status(400).send('Unable to update book to the database')
    })
});

libraryRoutes.get('/delete/:id', (req, res) => {
  Book.findOneAndDelete({_id: req.params.id})
    .then(book => {
      res.status(200).send('Book successfully removed')
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

function userValidating(user) {
  const userSchema = {
    'email': Joi.string().min(3).required(),
    'password': Joi.string().min(3).required()
  };
  return Joi.validate(user, userSchema);
}

module.exports = libraryRoutes;