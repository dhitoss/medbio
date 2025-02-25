import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("Tentando autenticar usuário:", credentials.email);

          if (!credentials?.email || !credentials?.password) {
            console.log("Credenciais faltando");
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          console.log("Usuário encontrado:", user);

          if (!user) {
            console.log("Usuário não encontrado");
            return null;
          }

          const isPasswordValid = user.password === credentials.password || await compare(
            credentials.password,
            user.password
          );

          console.log("Senha válida:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("Senha inválida");
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  },
  debug: true // Ativa logs detalhados do NextAuth
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };