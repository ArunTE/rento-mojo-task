module.exports = (app) => {

    const crawler = require('../controller/crawler');
    app.get('/crawl', crawler.get);
};