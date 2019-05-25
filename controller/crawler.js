'use strict';

const uuid = require('react-native-uuid');
const request = require('request-promise');
const HTML = require('html-parse-stringify')
const striptags = require('striptags');

const _ = require("lodash");

const CONFIG = require('../config');

const Cawler_Db = require('../models/crawler');

global.itemInProcessCache = [];
global.items = []; 

exports.get = () => {
    setTimeout(function () {
        exports.get();
    }, 500)
    console.log(global.itemInProcessCache);
    if (global.itemInProcessCache.length < 5) {
        global.itemInProcessCache.push(global.itemInProcessCache.length + 1);
        const options = {
            method: 'GET',
            url: CONFIG.env_variables.crawl_url
        };
        request(options).then(body => {
            let href = [];
            let final_href_arr = [];
            let a = striptags(body, ['a']);
            let html = HTML.parse(a);
            Object.keys(html).forEach((item) => {
                if (html[item].type === 'tag') {
                    href.push({'_id': uuid.v4(), 'url': html[item].attrs.href});
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
            global.itemInProcessCache.pop();
        });
    }
}

