var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hey Guys' });
});

router.post('/claim-hill/:id', function(req, res, next) {
  var name = req.body.name || 'No Name'
  var hill = req.params.id
  var startTime = new Date()
  console.log("Name: " + name + " Hill: " + hill)
  // model.hill.find({currentKing: name}, function (err, hill) {

  // })
})

module.exports = router;
