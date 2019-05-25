const crawler = require('./crawler');

module.exports = function(app) {
  crawler(app);
};
