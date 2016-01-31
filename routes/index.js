var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/beaking');
var hill = mongoose.model('hill', {name: String, currentKing: String, startDate: Date});
var king = mongoose.model('king', {name: String, time: Number});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hey Guys' });
});

router.post('/claim-hill/:id', function(req, res, next) {
  var name = req.body.name || 'No Name'
  var hillName = req.params.id
  var currentTime = new Date();
  var currentSeconds = currentTime.getTime()

  hill.findOne({name: hillName }, function(err, currentHill){
    if (err) return next(err)
    if (currentHill) {
      var score = currentSeconds - currentHill.startDate.getTime()
      king.update({name: currentHill.currentKing}, {$inc: {time: score}},{upsert: true}, function (err, currentKing) {
        if (err) return next(err)
        hill.update({name: hillName}, {startDate: currentTime, currentKing: name}, {upsert: true}, function (err, hill) {
          if (err) return next(err)
          console.log("You have taken the hill!")
        })
      })
    }
  });
})



module.exports = router;
