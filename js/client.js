var Iso = require('iso')
var Router = require('react-router')
var React = require('react')
var routes = require('../src/routes')
var alt = require('../src/alt')
var Fetcher = require('../src/utils/Fetcher')
var Loading = require('../src/actions/LoadActions')


Iso.bootstrap(function (state, _, container) {
    alt.bootstrap(JSON.stringify(state));
    var first = true;
    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
        console.log("Route", Handler)
        if(first){
            render(Handler, container);
            first = false;
        }
        else{
            Loading.begin(Handler);
            Fetcher._fetch(Handler, state).then((data) => {
                console.log(data);
                for(var key in data.storeData){
                    Loading.initializeData(data.storeData[key]);
                }
                render(Handler, container);
                Loading.end(Handler);
            });
        }
    })
});

function render(Handler, container) {
    var node = React.createElement(Handler);
    React.render(node, container);
};

