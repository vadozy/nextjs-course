import { MongoClient } from 'mongodb';
import { MONGO_URI } from '../../../env-private';

async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'GET') {
    console.log(eventId);

    const comments = await getAllComments(eventId);
    console.log(comments);

    const transformedComments = comments.map((c) => ({
      id: c._id.toString(),
      name: c.comment.name,
      text: c.comment.text,
    }));

    // const transformedComments = [
    //   { id: 'c1', name: 'Vadim', text: 'Comment 01' },
    //   { id: 'c2', name: 'Vadim', text: 'Comment 02' },
    //   { id: 'c3', name: 'Vadim', text: 'Comment 03' },
    // ];
    res.status(200).json({ comments: transformedComments });
  } else if (req.method === 'POST') {
    //validate
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res
        .status(400)
        .json({ message: 'Invalid Input: email, name, text are expected' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await insertComment(newComment);

    newComment.id = result.insertedId.toString();

    console.log(newComment);

    const msg = `A document was inserted with the _id: ${result.insertedId}`;
    console.log(msg);
    res.status(201).json({
      message: 'POST comment',
      comment: { _id: result.insertedId, ...newComment },
    });
  } else {
    res
      .status(404)
      .json({ message: 'Only POST and GET methods are implenented.' });
  }
}

export default handler;

async function insertComment(comment) {
  const mongoClient = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await mongoClient.connect();
  const database = mongoClient.db();
  const collection = database.collection('comment');
  const result = await collection.insertOne({ comment });
  await mongoClient.close();

  return result;
}

async function getAllComments(eventId) {
  const mongoClient = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await mongoClient.connect();
  const database = mongoClient.db();
  const collection = database.collection('comment');
  // const result = await collection.find({ eventId: { $eq: eventId } }).toArray();
  const result = await collection
    .find({ 'comment.eventId': eventId })
    .sort({ _id: -1 })
    .toArray();
  await mongoClient.close();
  return result;
}
