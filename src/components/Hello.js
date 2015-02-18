var React = require('react')

var HelloStore = require('../stores/HelloStore')
var Fetcher = require('../utils/Fetcher')

var App = React.createClass({
    statics: {
        fetch: function (params) {
            return {
                'HelloStore:names': ()=> {
                    return Fetcher.get("hellos");
                }
            }
        }
    },

    getInitialState() {
        return HelloStore.getState()
    },

    render() {
        return <div>{'Hello, ' + this.state.names.map(function(item){return item.name}).join(', ')}</div>
    }
})

module.exports = App
