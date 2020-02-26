var XLSX = require('xlsx');
var workbook = XLSX.readFile('input.xls', {sheetStubs: true});
var sheet_name_list = workbook.SheetNames;

var mongoose = require('mongoose'),
    Drug = mongoose.model('Drugs');


XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]).forEach(function (y) {
    var new_drug = new Drug(y);
    new_drug.save();
});