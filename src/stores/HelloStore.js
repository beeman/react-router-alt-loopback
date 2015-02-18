var alt = require('../alt')
var Actions = require('../actions/LoadActions')

class Store {
    constructor() {
        this.bindActions(Actions);
        this.names = [];
    }

    onInitializeData(data) {
        for (var key in data) {
            this[key] = data[key];
        }
    }
}

module.exports = alt.createStore(Store, 'HelloStore')
