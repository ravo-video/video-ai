import type { NextAuthConfig } from 'next-auth';

import { googleProvider } from './google-provider';

export const authConfig: NextAuthConfig = {
  providers: [googleProvider],
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnWebhooks = nextUrl.pathname.startsWith('/api/webhooks');
      const isOnPublicAPIRoutes = nextUrl.pathname.startsWith('/api/auth');
      const isOnAPIRoutes = nextUrl.pathname.startsWith('/api');
      const isOnPublicPages = nextUrl.pathname.startsWith('/auth');
      const isOnPrivatePages = !isOnPublicPages;

      if (isOnWebhooks || isOnPublicAPIRoutes) {
        return true;
      }

      if (isOnPublicPages && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      if (isOnAPIRoutes && !isLoggedIn) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
      }

      if (isOnPrivatePages && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
};
