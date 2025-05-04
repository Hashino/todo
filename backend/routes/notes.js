const router = require('express').Router();
let Notes = require('../models/note.model');

router.route('/').get((req, res) => {
  Notes.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const newNote = new Notes({
    title,
    content,
  });

  newNote
    .save()
    .then(() => res.json('Note added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Notes.findByIdAndDelete(req.params.id)
    .then(() => res.json('Note deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
  Notes.findById(req.params.id)
    .then((note) => {
      note.title = req.body.title;
      note.content = req.body.content;

      note
        .save()
        .then(() => res.json('Note updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
