const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

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

/* Submit */
router.post('/submit', [
    check('jobTitle').exists().withMessage('Le champ "Intitulé du Job" est obligatoire.'),
    check('jobUrl').exists().withMessage("Le champ \"Url de l'Offre\" est obligatoire."),
    check('email').isEmail().withMessage('Le champ "Email" du contact doit etre un email.').trim().normalizeEmail(),
    ], function(req, res, next) {

    const errors = validationResult(req);
    if( errors.isEmpty() ) 
    {
        res.send('submit job' );
    }
    else
    {
        res.render( 'jobs/add', { title: 'Ajout', errors: errors.array() } );
    }
});


module.exports = router;
