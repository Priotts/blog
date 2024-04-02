'use server'

import { auth, signIn, signOut, update } from "@/utils/auth"
import { connectToDb } from "./utils"
import User from "./models/user"
import bcrypt from 'bcryptjs';
import credentials from "next-auth/providers/credentials"
import { AuthError } from "next-auth";
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";

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

export const searchUser = async (username) => {
    try {
        const user = await User.findOne({ username: username })
        // console.log(user)
        return user
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const changeUsername = async (prevState, formData) => {
    const session = await auth()
    const newUsername = formData.get('username')
    try {
        connectToDb()
        const user = await User.findById(session.user._id)
        const checkUsername = await User.find({ username: newUsername })
        if (checkUsername.length > 0) {
            console.log('false')

            return { success: false, message: "Username not available" }
        }
        const updateUsername = await User.findByIdAndUpdate(session.user._id, { username: newUsername }, { runValidators: true, new: true })
        console.log("true")
        revalidatePath("/profile/settings")
        return { success: true, message: 'Username successfully updated' }
    } catch (error) {

        if (error._message === 'Validation failed') {
            return { success: false, message: "Username must be at least 4 characters" }
        }
        return { success: false, message: error.message }
    }
}

export const changeBio = async (prevData, formData) => {
    const session = await auth()
    const newBio = formData.get('bio')
    try {
        connectToDb()
        if (newBio.length === 0) {
            return { success: false, message: "Come on, enter at least 1 character!" }
        }
        const user = await User.findByIdAndUpdate(session.user._id, { bio: newBio }, { new: true })
        return { success: true, message: 'Bio successfully updated', }
    } catch (error) {
        // console.log(error)
        return { success: false, message: error.message }

    }
}

export const social = async (prevState, formData) => {
    const session = await auth()
    const github = formData.get("github")
    const x = formData.get("x")
    try {
        connectToDb()
        if (!github && !twitter) {
            return { success: false, message: 'Enter at least one contact before saving' };
          }
        if (github.length > 0) {
            const user = await User.findByIdAndUpdate(session.user._id, { 'contact.github': github }, { new: true })
        } 
        
        if(x.length > 0){
            const user = await User.findByIdAndUpdate(session.user._id,{'contact.twitter': x}, {new: true})
        }
        return { success: true, message: 'Contact successfully updated', }

    } catch (error) {
        return { success: false, message: error.message }

    }
}