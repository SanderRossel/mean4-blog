var express = require('express');
var routing = require('routing');
var adminRouting = require('adminRouting');
var app = express();

app.use('/', routing);
app.use('/admin', adminRouting);

/* Code below can be moved to modules. */

// Pattern matching.
app.get('/your*patt+ern(here)?', function(req, res) {
    res.send('Matched the pattern.');
});

// Generate error.
app.get('/error', function(req, res) {
    // something is undefined.
    var error = 1 / something;
    res.send('Code will never come here.');
});

// Handle 404 - Not Found.
app.use('*', function(req, res) {
    res.status(404).send("Well, looks like we've got a four-o-four, boys! (That mean the page was not found)");
});

// Error handlers.
var logger = function(err, req, res, next) {
    if (req.query.err == 'true') {
        var error = 1 / somethingElse;
    };
    console.error(err.stack);
    next();
};

var dbLogger = function(req, res, next) {
    console.log('Error logged to DB.');
    next();
};

var serveErrPage = function(req, res, next) {
    res.status(500).send('Oops, looks like you broke something!');
};

app.use('/', logger, dbLogger, serveErrPage);

// Error handler for when the error handling goes awry!
app.use('/', function(err, req, res, next) {
    // Everything failed...
    res.status(500).send('Even the error handling is bugged...');
});

var server = app.listen(80, '127.0.0.1');