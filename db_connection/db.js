'use strict';

const Sequelize = require('sequelize');

const DB_CONFIG = require('../config');

const connection = new Sequelize(DB_CONFIG.env_variables.db_name,  DB_CONFIG.env_variables.db_user, DB_CONFIG.env_variables.db_password, {
  host: DB_CONFIG.env_variables.db_host,
  dialect: 'mysql',
  //logging:false
});

module.exports = {
	connection : connection
};
