var express = require('express');
var router = express.Router();

const state = {
  counter: 0,
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  return res.json({
    'hello': 'world',
    counter: state.counter++,
  });
});

module.exports = router;
