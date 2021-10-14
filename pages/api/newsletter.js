import { MongoClient } from 'mongodb';
import { MONGO_URI } from '../../env-private';

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const mongoClient = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoClient.connect();
    const database = mongoClient.db();
    const collection = database.collection('email');
    const result = await collection.insertOne({ email });
    await mongoClient.close();

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.status(201).json({ message: `Signed Up ${email}`, result });
  } else {
    res.status(404).json({ message: 'Non POST methods are not allowed.' });
  }
}

export default handler;
