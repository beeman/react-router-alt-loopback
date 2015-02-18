var Fetcher = require('../src/utils/Fetcher');

module.exports = (app)=>{
    Fetcher.get = (model, filter)=>{
        return new Promise(function(resolve, reject) {
            app.models.Hello.find({}, function(err, items){
                console.log("Resolved from Server", items);
                resolve(items);
            });
        });
    }
    return Fetcher;
}