const moongoose = require('mongoose');

const noteSchema = new moongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Note = moongoose.model('Note', noteSchema);

module.exports = Note;
