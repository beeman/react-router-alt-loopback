var request = require('superagent');

module.exports = {
    get: (model, filter)=>{
        return new Promise(function(resolve, reject) {
            request
                .get('/api/' + model + (filter ? ("?filter=" + JSON.stringify(filter)) : ""))
                .end(function (err, res) {
                    if(err) reject();
                    else resolve(res.body);
                })
        });
    },

    _fetch(Handler, state) {
        var data = {
            storeData: {},
            stateData: {}
        };
        return Promise.all(state.routes
            .filter(route => route.handler.fetch)
            .map(route => {
                var item = route.handler.fetch(state);
                return Promise.all(Object.keys(item)
                    .map(key => {
                        return item[key](state).then(d => {
                            if(key.indexOf(':')>=0){
                                var store = key.split(':')[0];
                                var prop = key.split(':')[1];
                                if(!data.storeData[store]) data.storeData[store] = {};
                                data.storeData[store][prop] = d;
                            }
                            else
                                data.stateData[key] = d;
                        });
                    })
                );
            })
        ).then(() => data);
    }
}
