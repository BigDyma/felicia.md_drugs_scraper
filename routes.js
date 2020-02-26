'use strict';
module.exports = function(app) {
    var drugList = require('./controller');

    app.route('/drugs')
        .get(drugList.list_all_drugs)
        .post(drugList.create_a_drug);


    app.route('/drugs/:name')
        .get(drugList.read_a_drug)
};