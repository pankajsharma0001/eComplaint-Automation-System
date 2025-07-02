import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
// import { unauthorized } from "next/navigation";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (profile?.email?.endsWith('@pcampus.edu.np')) {
                return true;
            } else {
                return '/unauthorized';
            }
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };