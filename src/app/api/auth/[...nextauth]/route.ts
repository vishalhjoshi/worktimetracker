import NextAuth, { type SessionStrategy } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"
import prisma from "@/lib/prisma"

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
    async session({ session, token }: { session: any, token: any }) {
      if (session.user && token) {
        session.user.name = token.name;
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.name = user.name;
        token.id = user.id;
      }
      return token;
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }