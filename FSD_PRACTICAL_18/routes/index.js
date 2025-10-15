var express = require('express');
var router = express.Router();

//Import Model
const NotesModel = require('../models/Notes')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add-note', function(req, res, next){
  res.render('add-note')
})

router.post('/add-note-process', function(req, res, next){
  var notesData = {
    title: req.body.txt1,
    content: req.body.txt2
  }

  //Assign Data to Model
  var mydata = NotesModel(notesData)
  mydata.save()
  .then(()=> res.redirect('/display-note'))
  .catch((err)=> console.log(err))
})

router.get('/display-note', function(req, res, next){
  NotesModel.find()
  .then((mydata)=> {
    console.log(mydata)
    res.render('display-note', {mydata: mydata})
  })
  .catch((err)=> console.log(err))
})

router.get('/delete-note/:id', function(req, res, next){
  var myid = req.params.id

  NotesModel.findByIdAndDelete(myid)
  .then(()=> res.redirect('/display-note'))
  .catch((err)=> console.log(err))
})

router.get('/edit-note/:id', function(req, res, next){
  var myid = req.params.id

  NotesModel.findById(myid)
  .then((mydata)=> {
    console.log(mydata)
    res.render("edit-note", {mydata: mydata})
  })
  .catch((err)=> console.log(err))
})

router.post('/edit-note-process/:id', function(req, res, next){
  var myid = req.params.id

  var updatedData = {
    title: req.body.txt1,
    content: req.body.txt2
  }

  NotesModel.findByIdAndUpdate(myid, updatedData)
  .then(()=> res.redirect('/display-note'))
  .catch((err)=> console.log(err))
})

module.exports = router;
