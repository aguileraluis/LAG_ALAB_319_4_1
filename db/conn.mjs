import { MongoClient } from "mongodb";
import mongoose from 'mongoose'; 
import dotenv from 'dotenv'; 
dotenv.config(); 

const connectionString = process.env.ATLAS_URI;
console.log(connectionString)

try {
   await mongoose.connect(connectionString, { useUnifiedTopology : true, useNewUrlParser : true })
  var db = mongoose.connection.db;

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