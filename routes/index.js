var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Timestamper' });
});

router.get('/:time', function(req, res) {
  var dateParam = req.params.time;

  function toNatural(unix) {
    var date = new Date(unix * 1000);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    return month + ' ' + day + ', ' + year;
  }

  if(!isNaN(dateParam)) {
    var natural = toNatural(dateParam);
    var data = { unix: dateParam, natural: natural }
    //res.render('index', data);
    res.json(data);
  } else {
    var natural = new Date(dateParam);
    if(!isNaN(natural)) {
      var unix = natural / 1000;
      var data = { unix: unix, natural: dateParam }
      res.json(data);
    } else {
      var data = { unix: null, natural: null }
      res.json(data);
    }
  }

});

module.exports = router;
