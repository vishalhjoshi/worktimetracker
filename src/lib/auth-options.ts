import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import { type SessionStrategy, type Session, type User } from "next-auth";
import { type JWT } from "next-auth/jwt";

export const authOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials", credentials);
          return null;
        }
        const user = await prisma.user.findUnique({ where: { email: credentials.email }, select: { id: true, email: true, name: true, passwordHash: true } });
        if (!user) {
          console.error("User not found:", credentials.email);
          return null;
        }
        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) {
          console.error("Invalid password for:", credentials.email);
          return null;
        }
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" as SessionStrategy },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }: { session: Session, token: JWT }) {
      if (session.user && token) {
        session.user.name = token.name;
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT, user: User }) {
      if (user) {
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },
  },
}; 