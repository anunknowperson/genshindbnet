import { Db, MongoClient, MongoClientOptions } from 'mongodb'

import clientPromise from "./mongodb"

const connectToDatabase = async (dbname) => {

  var client = await clientPromise;

  return {client, db:  client.db(dbname)}
}

export async function withMongo(dbname, fn) {
  
  const conn = await connectToDatabase(dbname)
  return await fn(conn.db)
}