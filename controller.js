'use strict';


var mongoose = require('mongoose'),
    Drug = mongoose.model('Drugs');

exports.list_all_drugs = function(req, res) {
    Drug.find({}, function(err, drug) {
        if (err)
            res.send(err);
        res.json(drug);
    });
};

exports.create_a_drug = function(req, res) {
    var new_drug = new Drug(req.body);
    new_drug.save(function(err, drug) {
        if (err)
            res.send(err);
        res.json(drug);
    });
};

exports.read_a_drug = function(req, res) {
    var name = req.params.name;
    Drug.find({"commercial_name": {$regex: name + '.*'}}, function(err, drug) {
        if (err)
            res.send(err);

        var substance = drug[0] ? drug[0].substance : name;
        Drug.find({"substance": substance}, function(err, drug_subst) {
            if (err)
                res.send(err);
            res.json(drug_subst);
        });
    });
};




