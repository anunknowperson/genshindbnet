import NextAuth from "next-auth"

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials";

import clientPromise from "../../../lib/mongodb"

import { withMongo } from '../../../lib/mw';

import { compare } from 'bcryptjs';

export const authOptions = {
  session: { strategy: "jwt" },

  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@genshindb.net" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        
        const internalUser = await withMongo('data', async (db) => {
          const collection = db.collection('users');
          return await collection.findOne({ email: credentials.email });
        });

        if (internalUser) {
          if (internalUser.needVerification) {
            throw new Error('Email verification not completed.')
          }

          if (!(await compare(credentials.password, internalUser.password))) {
            throw new Error('Incorrect email or password. Please try again.')
          }

          return {name: internalUser.name, uid: internalUser.id }
        } else {
          throw new Error('Incorrect email or password. Please try again.')
        }
      }
    }),


    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
  ],

  callbacks: {
    
    async jwt({ token, user}) {
      
      if (user){
        token.name = user.name;
        token.uid = user.uid;
      }
      
      
      
      return token
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.name = token.name;
      session.user.uid = token.uid
      
      return session
    }
  },

  /*callbacks: {
    async session({ session, token }) {
      session.address = token.sub
      session.user.name = token.sub
      session.user.image = "https://www.fillmurray.com/128/128"
      return session
    },
  },*/
  /*callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  }*/
}
export default NextAuth(authOptions)