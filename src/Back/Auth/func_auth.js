const { connectDB } = require("../server/mongo");

async function getUser(dbName, collection, id) {
  const { client, db } = await connectDB(dbName);

  const result = await db.collection(collection).findOne({ id });

  console.log(result);
  client.close();

  return result;
}

//
//  1. Find DATABASE NAME & COLLECTION
//  2. INSERT DOCUMENT
//
async function registUser(dbName, collection, data) {
  const { client, db } = await connectDB(dbName, collection, data);

  const exisitingUser = await db
    .collection(collection)
    .findOne({ id: data.id });

  console.log(exisitingUser);
  if (exisitingUser) {
    console.log("User with the same id already exists");
    // Handle the case when the user already exists, for example, return an error
    return false;
  } else {
    try {
      console.log("Inserting document...");
      const result = await db.collection(collection).insertOne(data);
      console.log(`Inserted document with _id: ${result.insertedId}`);
      return true;
    } catch (e) {
      console.error("Error inserting document:", e);
    } finally {
      await client.close();
      console.log("Closed MongoDB connection");
    }
  }
}

module.exports = { getUser, registUser };
