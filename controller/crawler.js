'use strict';

const uuid = require('react-native-uuid');
const Crawler = require("crawler");
const _ = require("lodash");

const CONFIG = require('../config');

const Cawler_Db = require('../models/crawler');

exports.get = (req, res) => {
    
    let c = new Crawler({
        maxConnections : 5,
        // This will be called for each crawled page
        callback : function (error, response, done) {
            if(error){
                console.log(error);
                res.status(error.status || 400).send("CRWALING FAILED");
                return;
            }else{
                let $ = response.$;
                let urls = $("a");
                let href = [];
                let final_href_arr = [];
                Object.keys(urls).forEach((item) => {
                    if (urls[item].type === 'tag') {
                        href.push({'_id': uuid.v4(), 'url': urls[item].attribs.href});
                    }
                });
                let unique_hrefs = _.uniqBy(href, 'url');
                unique_hrefs.forEach(e => {
                    let obj = e;
                    let count = 0;
                    href.forEach(i => {
                        if (e.url.split('?')[0] === i.url.split('?')[0]) {
                            count = count + 1;
                        }
                    })
                    obj['reference_count'] = count;
                    obj['params'] = e.url.split('?')[1];
                    final_href_arr.push(obj);
                })
                Cawler_Db.bulkCreate(final_href_arr);
                res.status(200).send('CRAWLING DONE');
            }
            done();
        }
    });
    c.queue(CONFIG.env_variables.crawl_url);
}

