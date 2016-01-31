var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/beaking');
<<<<<<< HEAD
var hill = mongoose.model('hill', {name: String, currentKing: String, startDate: Date, previousKing: String});
=======
var hill = mongoose.model('hill', {name: String, currentKing: String, startDate: Date});
var king = mongoose.model('king', {name: String, time: Number});
>>>>>>> b9f1ba389d2da0652703fb0396f019f6323f7956

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
<<<<<<< HEAD
  var startDate = new Date()

   hill.findOne({name:hillName}, function (err, currentHill) {
     console.log(currentHill.previousKing)
   })
//  console.log(currenKingofHill)

  console.log("Name: " + name + " Hill: " + hillName)

//if(hill.find({previousKing: 'No Name'}))
//{
//  console.log("this is work")
//}
//else {
//  console.log("no work")
//}

  //console.log(hill.findOne({name:hillName}, 'previousKing', function(err, prevy) { }))

  if(hill.find({name: hillName, previousKing: name})) {
      console.log("You have claimed this hill too recently!")
  } else {
    hill.update({name: hillName}, {startDate: startDate, previousKing: name , currentKing: name}, {upsert: true}, function (err, hill) {
      if (err) next(err)
    })
  }

})

=======
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



>>>>>>> b9f1ba389d2da0652703fb0396f019f6323f7956
module.exports = router;
