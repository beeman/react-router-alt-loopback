var alt = require('../alt');

class LoadActions {
    constructor() {
        this.generateActions('begin', 'end', 'initializeData');
    }
}

module.exports = alt.createActions(LoadActions)
