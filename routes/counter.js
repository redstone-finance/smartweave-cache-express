var express = require('express');
var router = express.Router();

const state = {
  counter: 0,
};

// Just a quick test to check if mem cache works correctly
/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  return res.json({
    version: 3,
    counter: state.counter++,
  });
});

module.exports = router;
