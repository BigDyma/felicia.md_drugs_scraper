'use strict';
var mongoose = require('mongoose'),
    Drug = mongoose.model('Drugs');
let urls = [];
Drug.distinct(
    "commercial_name",
    {}, 
    (function(err, docs){
         if(err){
             return console.log(err);
         }
         if(docs){  
             console.log(docs);
             urls.push(docs);
         }
    })
 );