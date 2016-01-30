var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/beaking');
var hill = mongoose.model('hill', {name: String, currentKing: String, startDate: Date});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hey Guys' });
});

router.post('/claim-hill/:id', function(req, res, next) {
  var name = req.body.name || 'No Name'
  var hillName = req.params.id
  var startDate = new Date()
  console.log("Name: " + name + " Hill: " + hillName)
  hill.update({name: hillName}, {startDate: startDate, currentKing: name}, {upsert: true}, function (err, hill) {
    if (err) next(err)
    console.log(hill)
  })
})

module.exports = router;