var express = require('express');
var router = express.Router();

/* GET jobs listing. */
router.get('/', function(req, res, next) {
  res.send('list all jobs api');
});

/* GET job. */
router.get('/:id', function(req, res, next) {
  res.send(`list job ${req.params.id}`);
});

/* POST job. */
router.post('/', function(req, res, next) {
  res.send('post a job');
});

module.exports = router;
