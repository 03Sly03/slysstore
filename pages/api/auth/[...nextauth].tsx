import NextAuth from 'next-auth';
import User from '../../../models/User';
import db from '../../../utils/db';
import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';

type ExtendedUserType =
  | (typeof User & { isAdmin?: boolean; _id: Object })
  | undefined;

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if ((user as ExtendedUserType)?._id)
        token._id = (user as ExtendedUserType)?._id;
      if ((user as ExtendedUserType)?.isAdmin)
        token.isAdmin = (user as ExtendedUserType)?.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
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
            id: user._id,
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
