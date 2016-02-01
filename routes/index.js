var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/beaking');
var hill = mongoose.model('hill', {name: String, currentKing: String, startDate: Date});
var king = mongoose.model('king', {name: String, time: Number, lastHill: String});

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
  var name = req.body.name.toLowerCase() || 'No Name'
  var hillName = req.params.id
  var currentTime = new Date();
  var currentSeconds = currentTime.getTime()
  hill.findOne({name: hillName}, function(err, currentHill){
    if (err) return next(err)
    var outedKing = (currentHill ? currentHill.currentKing : '')
    var score = Math.round((currentSeconds - (currentHill && currentHill.startDate ? currentHill.startDate.getTime(): 0)) / 1000)
    var lastHillofContender = 'none';
    king.findOne({name: name}, function(err, contender) {
      if (err) return next(err)
      if(contender) {
        lastHillofContender = contender.lastHill
      } else {
        lastHillofContender = 'none'
      }
      if(lastHillofContender == hillName) {
        console.log("You need to claim another hill first!")
        res.redirect('/silly-goose')
      } else {
        king.update({name: name}, {lastHill: hillName}, {upsert: true}, function(err, newKing) {
          if(err) return next(err)
          king.update({name: outedKing}, {$inc: {time: score}},{upsert: true}, function (err, currentKing) {
            if (err) return next(err)
            hill.update({name: hillName}, {startDate: currentTime, currentKing: name}, {upsert: true}, function (err, hill) {
              if (err) return next(err)
                res.redirect('/')
              })
            })
          })
        }
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

router.get('/silly-goose', function(req, res, next) {
  res.render('sillygoose')
})

router.get('/rules', function(req, res, next) {
  res.render('rules')
})

router.get('/black-knight', function(req, res, next) {
  res.render('blackknight')
})


module.exports = router;
