const mongoose = require('mongoose');
const path = require('path');
const User = require('./User');

const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', '..', '/config/configMongo.json');
const config = require(configPath)[env];

const { host, database } = config;
const mongoURI = `mongodb://${host}:27017/${database}`;

mongoose.connect(mongoURI)
.catch((err) => {
  console.log('connect failed');
  process.exit(1);
});

module.exports = {
  User
}
