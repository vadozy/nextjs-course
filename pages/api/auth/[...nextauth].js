import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        try {
          const usersCollention = client.db().collection('users');
          const user = await usersCollention.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error('No user found!');
          }

          const submittedPassword = credentials.password;
          const storedHashedPassword = user.password;
          const validPassword = await verifyPassword(
            submittedPassword,
            storedHashedPassword
          );

          if (!validPassword) {
            throw new Error('Wrong password!');
          }

          return { email: user.email, dummy: 'Vadim' };
        } finally {
          client.close();
        }
      },
    }),
  ],
});
