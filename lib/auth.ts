import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

export const auth = betterAuth({
  database: pool,

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

  /*
    When a new user signs in for the first time, automatically create
    a matching student profile linked to their Better Auth user account.
  */

  // databaseHooks runs everytime Better Auth performs an operation on its own tables e.g (user, account, session).
  databaseHooks: {
    user: {
      // triggers when a user is created in user table
      create: {
        after: async (user) => {
          try {
            await pool.query(
              "INSERT INTO student_profiles (user_id, onboarding_step) VALUES ($1, $2)",
              [user.id, 1],
            );
          } catch (error) {
            console.error(
              "Failed to create student_profile for user:",
              user.id,
              error,
            );
            throw error;
          }
        },
      },
    },
  },
});
