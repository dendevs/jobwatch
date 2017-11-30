const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const Job = require('../../models/Job.js' );
const format = require('date-fns/format')

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
    check('jobTitle').exists()
        .custom( (value, {req} ) => typeof value == 'string' && value.length > 1 )
        .withMessage('Le champ "Intitulé du Job" est obligatoire.'),
    check('jobUrl').exists()
        .custom( (value, {req} ) => typeof value == 'string' && value.length > 1 )
        .withMessage('Le champ "Url de l\'Offre" est obligatoire.'),
    check('email').isEmail()
        .withMessage('Le champ "Email" du contact doit etre un email.').trim().normalizeEmail(),
    ], function(req, res, next) {

    const errors = validationResult(req);
    if( errors.isEmpty() ) 
    {
        console.log( req.body );
        let job = new Job();
        job.name = req.body.name;
        job.website = req.body.website;
        job.jobTitle = req.body.jobTitle;
        job.jobUrl = req.body.jobUrl;
        job.contractType = req.body.contractType;
        job.techonolgies = req.body.techonolgies;
        job.skills = req.body.skills;
        job.street = req.body.street;
        job.number = req.body.number;
        job.postablBox = req.body.postablBox;
        job.postablCode = req.body.postablCode;
        job.city = req.body.city;
        job.country = req.body.country;
        job.lastname = req.body.lastname;
        job.firstname = req.body.firstname;
        job.email = req.body.email;
        job.gsm = req.body.gsm;
        job.applicationDocuments = req.body.applicationDocuments;
        if( req.body.deadline )
        {
            let date = req.body.deadline.split('/');
            deadlineEn = date[1] + '/' + date[0] + '/' + date[2];
            console.log( deadlineEn );
            job.deadline = date[1] + '/' + date[0] + '/' + date[2];
        }
        job.save( (err) => {
            if (err)
                console.log( err );
            else
                console.log( 'ok' );
            // saved!
        });
        res.send('submit job' );
    }
    else
    {
        res.render( 'jobs/add', { title: 'Ajout', values: req.body, errors: errors.array() } );
    }
});


module.exports = router;
