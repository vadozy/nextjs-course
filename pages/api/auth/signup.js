import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // validate
    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message: 'Invalid input, password must be at least 7 characters long',
      });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    const userExists = await db.collection('users').findOne({ email });
    if (userExists) {
      res.status(422).json({
        message: 'User already exists',
      });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Created user!', result });
  } else {
    res.status(404).json({
      message: `Method ${req.method} is NOT supported`,
    });
    client.close();
  }
}

export default handler;
