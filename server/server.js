
var path = require('path')
var Router = require('react-router')
var React = require('react')
var express = require('express')
var Iso = require('iso')
var loopback = require('loopback');
var boot = require('loopback-boot');


require('node-jsx').install({harmony: true})
var routes = require('../src/routes')
var alt = require('../src/alt')

var app = module.exports = loopback();
boot(app, __dirname);

// This is express boilerplate to make our bundled JS available as well
// as our template
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'templates'))
app.use('/js', express.static(path.join(__dirname, '..', 'js')))

var fetcher = require('./server-fetch');
fetcher = fetcher(app);
// This is where the magic happens, we take the locals data we have already
// fetched and seed our stores with data.
// Next we use react-router to run the URL that is provided in routes.jsx
// Finally we use iso in order to render this content so it picks back up
// on the client side and bootstraps the stores.
app.use(function (req, res) {
    alt.bootstrap(JSON.stringify(res.locals.data || {}))

    var iso = new Iso();
    Router.run(routes, req.url, function (Handler, state) {
        fetcher._fetch(Handler, state).then(function(data){
            alt.bootstrap(JSON.stringify(data.storeData));
            console.log("Have data", data.storeData);
            var content = React.renderToString(React.createElement(Handler));
            iso.add(content, data.storeData);

            res.render('layout', {
                html: iso.render()
            });
        });
    });
})

app.listen(function () {
    console.log('Listening on localhost:' + app.get('port'))
})
