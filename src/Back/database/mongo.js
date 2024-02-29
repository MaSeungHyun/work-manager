const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function run() {
  const uri = process.env.MONGODB_URI;
  mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
  // mongodb 연결
  mongoose
    .connect(uri)
    .then((res) => {
      console.log('Successfully connected to mongodb');
    })
    .catch((e) => {
      console.error(e);
    });
}

//
// Connect DATABASE
//
async function connectDB(dbName) {
  const uri = `${process.env.MONGODB_URI}`;
  const client = new MongoClient(uri);
  const db = client.db(dbName);

  return { client, db };
}

module.exports = { run, connectDB };
