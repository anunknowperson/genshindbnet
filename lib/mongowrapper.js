import { Db, MongoClient, MongoClientOptions } from 'mongodb'

const MONGODB_URI = process.env.MONGO_DB_URL
const MONGODB_DB = process.env.MONGO_DB_NAME

import clientPromise from "./mongodb"

const connectToDatabase = async () => {
  var client = await clientPromise;

  return {client, db:  client.db(MONGODB_DB)}
}

export async function withMongo(fn) {
  
  const conn = await connectToDatabase()

  return await fn(conn.db)
}