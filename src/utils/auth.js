import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "./utils";
import { authConfig } from "./auth.config";
import bcrypt from 'bcryptjs';

const User = require("./models/user")

const login = async (credentials) => {
    try {
        connectToDb()
        const user = await User.findOne({ username: credentials.username })
        if (!user) {
            return null
        }

        const checkPassword = await bcrypt.compare(credentials.password, user.password)

        if (!checkPassword) {
            return null
        }
        return user
    } catch (error) {
        // console.log(error)
        throw new Error('failed to login')
    }
}

export const { handlers: { GET, POST }, auth, signIn, signOut, update } = NextAuth({
    ...authConfig,
    providers:
        [
            GitHub({
                clientId: process.env.GITHUB_ID,
                clientSecret: process.env.GITHUB_SECRET,
            }),
            CredentialsProvider({
                async authorize(credentials) {
                    console.log('authorize function called');
                    try {
                        const user = await login(credentials)
                        if (!user) {
                            throw new Error("Failed"); // Return null for failed login
                        } else {
                            return user
                        }
                    } catch (error) {
                        console.error(error)
                        return null; // Return null for failed login
                    }
                }
            })
        ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === 'github') {
                connectToDb()
                try {
                    const user = await User.findOne({ email: profile.email })
                    if (!user) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            pfp: profile.avatar_url,
                        })
                        await newUser.save()
                    }
                } catch (error) {
                    console.error(error)
                    return false
                }
            }
            return true
        },
        //         async jwt({token, user}) {
        //     if (user) {

        //         token.user = user;
        //     }
        //     return token;
        // },
        // async session({session, token}) {
        //     session.user = token.user;
        //     return session;
        // },
        ...authConfig.callbacks,
    }
})
