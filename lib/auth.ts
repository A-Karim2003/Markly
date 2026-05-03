import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  // When Better Auth tries to set cookies inside a Server Action, manually sync those cookies into Next.js/browser.”
  plugins: [nextCookies()],

  // Enable email + password login
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      console.log("Reset password email for:", user.email);
      console.log("Reset link:", url);

      // later:
      // send email here
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },

  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  // },
});
