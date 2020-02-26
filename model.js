'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DrugSchema = new Schema({
    id: String,
    commercial_name: String,
    form: String,
    concentration: String,
    quantity: String,
    origin: String,
    manufacturer: String,
    substance: String,
    expiration: Number,
    price: Number, 
    image: String,
});

module.exports = mongoose.model('Drugs', DrugSchema);