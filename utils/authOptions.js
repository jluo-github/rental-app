import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    // todo:
    async signIn({ profile }) {
      // conncet to database
      await connectDB();

      // check if user already exists
      const userExists = await User.findOne({ email: profile.email });

      // if user does not exist, create a new user
      if (!userExists) {
        // truncate user name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      return true; // Do different verification for other providers that don't have `email_verified`
    },

    // todo:
    async session({ session }) {
      // get user from database
      const user = await User.findOne({ email: session.user.email });

      // add user _id to session id
      session.user.id = user._id.toString();

      return session;
    },
  },
};
