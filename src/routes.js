var React = require('react')
var Route = require('react-router').Route

var App = require('./components/App.js')
var Hello = require('./components/Hello.js')
var Time = require('./components/Time.js')

var routes = (
  <Route name='home' path='/' handler={App}>
    <Route name='hello' path='/hello/:name?' handler={Hello} />
    <Route name='time' path='/time' handler={Time} />
  </Route>
)

module.exports = routes
