import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    user: {
      id: string | unknown;
      name: string;
      email: string;
      password: string;
      isAdmin: true | unknown;
    } & DefaultSession['user'];
  }
}
