const { connectDB } = require('../database/mongo');

async function getUser(dbName, collection, id) {
  const { client, db } = await connectDB(dbName);

  const result = await db.collection(collection).findOne({ id });

  client.close();

  return result;
}

//
//  1. Find DATABASE NAME & COLLECTION
//  2. INSERT DOCUMENT
async function registUser(dbName, collection, data) {
  const { client, db } = await connectDB(dbName, collection, data);

  const exisitingUser = await db
    .collection(collection)
    .findOne({ id: data.id });

  if (exisitingUser) {
    console.log('User with the same id already exists');
    // Handle the case when the user already exists, for example, return an error
    return false;
  } else {
    try {
      console.log('Inserting document...');
      const result = await db.collection(collection).insertOne(data);
      console.log(`Inserted document with _id: ${result.insertedId}`);
      return true;
    } catch (e) {
      console.error('Error inserting document:', e);
    } finally {
      await client.close();
      console.log('Closed MongoDB connection');
    }
  }
}

// save Token
// save user id
// save name

// 로그인한 유저 등록 함수
async function registLoginUser(dbName, collection, data) {
  const { client, db } = await connectDB(dbName, collection);

  try {
    const existingUser = await db
      .collection(collection)
      .findOne({ id: data.id });

    if (existingUser) {
      const updateDoc = {
        $set: {
          refresh_token: data.refresh_token,
          timestamps: data.timestamps,
        },
      };

      console.log('Updating Token...');
      await db
        .collection(collection)
        .updateOne({ id: data.id }, updateDoc, { expireAfterSeconds: 60 });
    } else {
      console.log('Inserting document...');
      await db
        .collection(collection)
        .insertOne(data, { expireAfterSeconds: 60 });
    }
    // await collection.createIndex({ timestamps: 1 }, { expireAfterSeconds: 60 }); //
    // console.log('Inserting TTL index...');

    return true;
  } catch (e) {
    console.error('Error:', e);
    return false;
  } finally {
    await client.close();
    console.log('Closed MongoDB connection');
  }
}

module.exports = { getUser, registUser, registLoginUser };
