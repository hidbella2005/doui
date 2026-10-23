import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) return false;
      if (req.nextUrl.pathname.startsWith('/admin')) return token.role === 'ADMIN';
      return true;
    },
  },
});

export const config = { matcher: ['/dashboard/:path*', '/therapist/dashboard/:path*', '/booking/:path*', '/admin/:path*'] };
