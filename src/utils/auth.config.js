const User = require("./models/user")
import { NextResponse } from 'next/server'


export const authConfig = {
    pages: {
        signIn: "/",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (account?.provider === 'github' && user) {
                token.username = profile.login;
                token.pfp = profile.avatar_url;
                const dbUser = await User.findOne({ email: profile.email })
                if (dbUser) {
                    // If the user is found, use the database user ID instead of the GitHub ID
                    token.id = dbUser.id;
                    token.posts = dbUser.posts
                }
            }
            else if (user) {
                token.username = user.username;
                token.name = user.username
                token.pfp = user.pfp;
                token.id = user.id
                token.posts = user.posts
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token;
                session.user.id = token.id
                session.user.username = token.username
            }
            return session;
        },
        authorized({ auth, request }) {
            const user = auth?.user
            // console.log("auth", auth)
            const isOnPage = request.nextUrl?.pathname === "/"
            const isOnHome = request.nextUrl?.pathname.startsWith("/home")
            const isOnProfile = request.nextUrl?.pathname.startsWith("/profile")
            if (isOnHome && !user) {
                return NextResponse.redirect(new URL('/login', request.url))
            }
            if (isOnProfile && !user) {
                return false
            }
            if(isOnPage && user){
                return NextResponse.redirect(new URL('/home', request.url))
            }
            return true
        }
    }
}