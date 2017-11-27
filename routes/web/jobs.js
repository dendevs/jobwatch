var express = require('express');
var router = express.Router();

/* GET jobs listing. */
router.get('/', function(req, res, next) {
  res.render('jobs', { title: 'Jobs' });
});

/* Add a new job. */
router.get('/add', function(req, res, next) {
  res.render('jobs/add', { title: 'Ajout' });
});

/* GET job. */
router.get('/:id', function(req, res, next) {
  res.send(`list job ${req.params.id}`);
});



module.exports = router;
