// config/database.js

//new Mongoose rules >=4.11.0
//http://mongoosejs.com/docs/connections.html#use-mongo-client

module.exports = {
	'secret': 'bloom',
	'url':'mongodb://admin:admin@ds161471.mlab.com:61471/bloom',
	'test':'mongodb://localhost/bloomtest'
};
