import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'http://wordpress';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'WordPress',
      credentials: {
        username: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          // Authenticate via WP JWT plugin
          const res = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;

          const data = await res.json();

          if (!data.token) return null;

          // Get WooCommerce customer ID
          const wcKey = process.env.WC_CONSUMER_KEY;
          const wcSecret = process.env.WC_CONSUMER_SECRET;
          const creds = Buffer.from(`${wcKey}:${wcSecret}`).toString('base64');

          const customerRes = await fetch(
            `${WP_URL}/wp-json/wc/v3/customers?email=${encodeURIComponent(credentials.username)}`,
            { headers: { Authorization: `Basic ${creds}` } }
          );

          let customerId = null;
          if (customerRes.ok) {
            const customers = await customerRes.json();
            customerId = customers[0]?.id ?? null;
          }

          return {
            id: data.user_email,
            email: data.user_email,
            name: data.user_display_name,
            token: data.token,
            customerId,
            roles: data.user_roles || ['customer'],
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.wpToken = (user as any).token;
        token.customerId = (user as any).customerId;
        token.roles = (user as any).roles;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        wpToken: token.wpToken as string,
        customerId: token.customerId as number,
        roles: token.roles as string[],
      } as any;
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
