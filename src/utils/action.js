'use server'

import { auth, signIn, signOut } from "@/utils/auth"
import { connectToDb } from "./utils"
import User from "./models/user"
import bcrypt from 'bcryptjs';
import credentials from "next-auth/providers/credentials"
import { AuthError } from "next-auth";
import { redirect } from 'next/navigation'

export const handleGitHubLogin = async () => {
    await signIn('github')
}

export const handleLogOut = async () => {
    await signOut("")
}

export const register = async (previusState, formData) => {
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')
    try {
        connectToDb()
        const user = await User.findOne({ email })
        if (user) {
            return { success: false, message: "User already exists" };
        }
        if (!username.length) {
            return { success: false, message: 'Username is required' }
        }
        if (!email.length) {
            return { success: false, message: 'Email is required' }
        }
        if (!password.length) {
            return { success: false, message: 'Password is required' }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()
        console.log('saved to db')
        return { success: true, message: 'User created successfully' }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return { success: false, message: messages.join(', ') };
        }
        else if (error.code === 11000) {
            console.log('Username already exists');
            return { success: false, message: 'User already exists' };
        }
        else {
            // console.error(error);
            return { success: false, message: error.message };
        }
    }
}

export const login = async (previusState, formData) => {
    const username = formData.get('username')
    const password = formData.get('password')

    try {
        await signIn("credentials", { username, password })
       
        return { success: true, message: 'User successfully logged in' }
    } catch (error) {
        // console.error(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { success: false, message: "Invalid username or password" };
                default:
                    return { success: false, message: "Something went wrong" };
            }
        }
        throw error
    }
};