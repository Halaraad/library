const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  book_title: {
    type: String
  },
  author: {
    type: String
  },
  date: {
    type: String
  },
  img: {
    type: String
  },
  file: {
    type: String
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);