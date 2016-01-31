var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/beaking');
var hill = mongoose.model('hill', {name: String, currentKing: String, startDate: Date});
var king = mongoose.model('king', {name: String, time: Number});

router.get('/', function(req, res, next) {
    var currentTime = new Date();
    var currentSeconds = currentTime.getTime()
    king.find().sort({'time': -1}).exec(function (err, kings) {
    if (err) return next(err)
    hill.find({}, function (err, hills) {
      hills.forEach(function (myHill) {
        kings.forEach(function (myKing) {
          if(myHill.currentKing === myKing.name) {
            myKing.time += Math.round((currentSeconds - myHill.startDate.getTime())/1000)
          }
        })
      })
      res.render('index', {
        kings: kings,
        hills: hills
      })
    })
  })
});

router.post('/claim-hill/:id', function(req, res, next) {
  var name = req.body.name || 'No Name'
  var hillName = req.params.id
  var currentTime = new Date();
  var currentSeconds = currentTime.getTime()
  hill.findOne({name: hillName}, function(err, currentHill){
    if (err) return next(err)
    var outedKing = (currentHill ? currentHill.currentKing : '')
    var score = Math.round((currentSeconds - (currentHill && currentHill.startDate ? currentHill.startDate.getTime(): 0)) / 1000)
    king.update({name: outedKing}, {$inc: {time: score}},{upsert: true}, function (err, currentKing) {
      if (err) return next(err)
      hill.update({name: hillName}, {startDate: currentTime, currentKing: name}, {upsert: true}, function (err, hill) {
        if (err) return next(err)
        console.log("You have taken the hill!")
      })
    })
  });
})

router.get('/hank-hell', function(req, res, next) {
  res.render('jacques2')
})

router.get('/burger-hill', function(req, res, next) {
  res.render('jacques1')
})

router.get('/dragons-den', function(req, res, next) {
  res.render('marcus1')
})

router.get('/lindsey', function(req, res, next) {
  res.render('lindsey1')
})



module.exports = router;
