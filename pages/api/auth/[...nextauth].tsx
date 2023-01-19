import NextAuth from 'next-auth';
import User from '../../../models/User';
import db from '../../../utils/db';
import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';

type ExtendedUserType = (typeof User & { isAdmin?: string }) | undefined;

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('le user bidule turcmushe: ', user);
      if (user?.id) token.id = user.id;
      if ((user as ExtendedUserType)?.isAdmin)
        token.isAdmin = (user as ExtendedUserType)?.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'text' },
      },
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({
          email: credentials?.email,
        });
        await db.disconnect();
        if (
          user &&
          bcryptjs.compareSync(credentials!.password, user.password)
        ) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: 'f',
            isAdmin: user.isAdmin,
          };
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],
});
