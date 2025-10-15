const mongoose = require('mongoose')

//Schema
const NotesSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

//Model
const NotesModel = mongoose.model('Notes', NotesSchema)

module.exports = NotesModel