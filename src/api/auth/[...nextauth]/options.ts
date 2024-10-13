import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (
            !user ||
            !bcrypt.compareSync(credentials.password, user.passwordHash)
          ) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (err) {
          console.error("Error during authentication:", err);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
};

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         ...session.user,
//         id: token.id as string,
//         role: token.role as string,
//       };
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       if (url.includes("/worker")) {
//         return `${baseUrl}/worker-dashboard`;
//       } else if (url.includes("/resident")) {
//         return `${baseUrl}/resident-dashboard`;
//       }
//       return baseUrl;
//     },
//   },
