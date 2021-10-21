import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword, hashPassword } from '../../../lib/auth';

async function handler(req, res) {
  // only PATCH request is accepted
  if (req.method !== 'PATCH') {
    res.status(404).json({
      message: `Method ${req.method} is NOT supported`,
    });
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({
      message: 'Cannot change password, User is NOT authenticated',
    });
    return;
  }

  const email = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  try {
    const usersCollention = client.db().collection('users');
    const user = await usersCollention.findOne({
      email,
    });

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    const storedHashedPassword = user.password;
    const validPassword = await verifyPassword(
      oldPassword,
      storedHashedPassword
    );

    if (!validPassword) {
      res.status(403).json({
        message: 'Invalid password',
      });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    await usersCollention.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    res.status(200).json({
      message: 'Password updated',
    });
  } finally {
    client.close();
  }
}

export default handler;
