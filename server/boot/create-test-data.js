var server = require('../server');
var path = require("path");
var dataSource = server.dataSources.defaultDb;

var helloData = require('./data/hello.json');

var Hello = server.models.Hello;

dataSource.autoupdate("Hello", function(er) {
    if (er) throw er;
    Hello.count(function(err, count){
        console.log(count);
        if(count != 0) return;
        helloData.forEach(function(item) {
            Hello.create(item, function(er, result) {
                if (er) console.log(er);
                console.log('Hello created:', result);
            });
        });
    });
});