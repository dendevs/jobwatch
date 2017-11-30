const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cheerio = require('cheerio')


/* routes */
const web_index = require('./routes/web/index');
const web_users = require('./routes/web/users');
const web_jobs = require('./routes/web/jobs');

const api_jobs = require('./routes/api/jobs');

/* express */
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* helpers */
const hbs = require('hbs');
hbs.registerHelper('select', function( value, options ){
    const $ = cheerio.load(options.fn(this))
    if( value )
        $('[value='+value+']').attr('selected', 'selected');
    return $.html();
});
hbs.registerHelper('checkbox', function( value, options ){
    const $ = cheerio.load(options.fn(this))
    console.log( value );
    if( value )
    {
        for( let i = 0 ; i < value.length ; i++ )
        {
            $('[value='+value[i]+']').attr('checked', 'checked');
        }
    }
    return $.html();
});


/* css */
app.use('/css/bulma.css', express.static(__dirname + '/node_modules/bulma/css/bulma.css') );

/* middleware */
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* routes */
app.use('/', web_index);
app.use('/users', web_users);
app.use('/jobs', web_jobs);

app.use('/api/v1/jobs', api_jobs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
