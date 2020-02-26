const axios =   require('axios');
const cheerio = require('cheerio');
const request = require('request');
var mongoose =  require('mongoose'),
    Drug = mongoose.model('Drugs');
    const Fs = require('fs-extra');
let finaldata = [];
let mapfornames = [];
    async function writeToFile (path, data) {  
        const json = JSON.stringify(data, null, 2)
      
        try {
            await Fs.writeFile(path, json)
            console.log('Saved data to file.')
          } catch (error) {
            console.error(error)
          }
      }

     

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, html) => {
            if (error)
                return reject();

            if(!error && response.statusCode === 200){
                const $ = cheerio.load(html);
                
                const categories = $('.subcat__title') ;
                const drug_price = $('.product-box-price');
        
                let drug_parameters = [];
                drug_price.each(function() 
                {
                    const drug_original_name = url.split("=")[1];
                    const drug_substance = mapfornames[drug_original_name];
                    const drug_name = $(this).parent().find('a').text();
                    const drug_price = $(this).text();
                    const drug_img_link = $(this).parent().parent().find("img").attr("src");
                    const drug_page_link = "https://felicia.md" + $(this).parent().parent().find("a.productinfo-title.product-list-item-title").attr("href");
                    drug_parameters.push({
                        name: drug_name.trim(),
                        price: drug_price.trim(),
                        image: drug_img_link,
                        original_name: drug_original_name,
                        product_link: drug_page_link,
                        drug_substance: drug_substance
                    });
                    
                });
                if (drug_parameters.length > 0)
                {
                    console.log(drug_parameters);
                    finaldata.push(drug_parameters);
                }
            }
        });
        writeToFile("./finaldata.json", finaldata)
        resolve();
    });
}

function sleep(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function doSomeShit() {
    let names = [];
    await new Promise((resolve, reject) => {
        Drug.distinct(
            "commercial_name",
            {}, 
            (function(err, docs)
            {
                if(err){
                    console.log(err);
                    reject();
                } 
                else if (docs) 
                {  
                    //console.log(docs);
                    names = docs;
                    resolve();
                } 
            })
        );
    });
await new Promise((resolve, reject) => {
    Drug.find( {},{commercial_name:1, substance:1, _id:0}, function(err, res)
      {
         if (err)
         {
             console.log(err);
             reject();
         }
        else if (res)
        {
           res.forEach(function(x)
           {
                mapfornames[x.commercial_name] = x.substance;
           })
         //console.log(mapfornames);
           resolve();
           
        }
     })
    });
    let urls = names.map(name => ("https://felicia.md/ro/search?query=" + name));
   // console.log(urls);    

    for (let url of urls) {
        await makeRequest(url);
        await sleep(100);
    }
}

doSomeShit().then('Finished');