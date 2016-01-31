var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/beaking');
var hill = mongoose.model('hill', {name: String, currentKing: String, startDate: Date, previousKing: String});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hey Guys' });
});

router.post('/claim-hill/:id', function(req, res, next) {
  var name = req.body.name || 'No Name'
  var hillName = req.params.id
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

module.exports = router;
