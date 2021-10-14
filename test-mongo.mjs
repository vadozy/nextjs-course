// const { MongoClient } = require('mongodb');
import { MongoClient } from 'mongodb';
import { MONGO_URI } from './env-private.mjs';

// Connection URI
const uri = MONGO_URI;

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
