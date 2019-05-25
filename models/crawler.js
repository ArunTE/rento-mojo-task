const DB = require('../db_connection/db');
const Sequelize = require('sequelize');

const Crawler = DB.connection.define('crawlers', {
    _id: {
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false
	},
	url: {
		type: Sequelize.STRING
	},
	reference_count: {
		type: Sequelize.INTEGER
	},
	params: {
		type: Sequelize.STRING
	}
}, {paranoid: true});

DB.connection.sync();

module.exports = Crawler;