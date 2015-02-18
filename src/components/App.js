var React = require('react')
var { RouteHandler, Navigation, Link } = require('react-router')

var App = React.createClass({
  mixins: [Navigation],

  render() {
    return (
      <div>
        <Link to="hello">Say hi</Link>
        <br />
        <Link to="time">What time is it.</Link>
        <br />
        <RouteHandler {...this.props} />
      </div>
    )
  }
})

module.exports = App
