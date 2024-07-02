const mongoose = require('mongoose');
const { uri, defaultDb } = require('../config/db.config');
let connection;

const connectDB = () => {
  if (!connection) {
    connection = mongoose.createConnection(uri, {
    //   dbName: defaultDb,
    });
    console.log('New Connection Established');
  } else {
    console.log('Reusing Existing Connection');
  }
  return connection;
}

module.exports = { connectDB };