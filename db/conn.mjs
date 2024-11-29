import { MongoClient } from "mongodb";
import mongoose from 'mongoose'; 
import dotenv from 'dotenv'; 
dotenv.config(); 

// const connectionString = process.env.ATLAS_URI || "";

try {
  await mongoose.connect("mongodb+srv://luis:gfivu7UMpNm7e2t8@cluster0.bsxnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useUnifiedTopology : true, useNewUrlParser : true })
  var db = mongoose.connection.db;

  const collections = await db.listCollections().toArray(); 

  console.log(collections); 

  if (db) {
    console.log('MongoDB Connection Successful.')
  } else {
    console.log('We are sorry, connection to MongoDB Failed.');
  }

} catch (error) {
  console.error(error); 
}
// let conn;
// try {
//   conn = await client.connect();
// } catch (e) {
//   console.error(e);
// }

export default db;