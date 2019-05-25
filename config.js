'use strict';

const env_variables = {
    'port': process.env.PORT || 3000,
    'db_host': process.env.HOST || 'localhost',
    'db_name': process.env.DB_NAME || 'rentomojo',
    'db_user': process.env.DB_USER || 'root',
    'db_password': process.env.DB_PASSWORD || 'arun',
    'crawl_url': 'https://medium.com/'
}

module.exports = {
	env_variables: env_variables
}