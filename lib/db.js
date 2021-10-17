import { MongoClient} from 'mongodb';
import { MONGO_URI } from '../env-private.mjs';

export async function connectToDatabase() {
  const client = await MongoClient.connect(MONGO_URI);
  return client;
}

