'use server'

import { auth, signIn, signOut, update } from "@/utils/auth"
import { connectToDb } from "./utils"
import User from "./models/user"
import Post from "./models/post"
import bcrypt from 'bcryptjs';
import credentials from "next-auth/providers/credentials"
import { AuthError } from "next-auth";
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';

//CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


export const handleGitHubLogin = async () => {
    await signIn('github')
}

export const handleLogOut = async () => {
    await signOut("")
}


// REGISTER
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

// LOGIN
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


// SEARCH USER
export const searchUser = async (username) => {
    try {
        const user = await User.findOne({ username: username })
        if (!user) {
            return { success: false, message: "User not found" }

        }
        revalidatePath("/home")
        return { success: true, userPfp: user.pfp, username: user.username }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

// CHANGE USERNAME
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
        revalidatePath("/profile")
        return { success: true, message: 'Username successfully updated' }
    } catch (error) {

        if (error._message === 'Validation failed') {
            return { success: false, message: "Username must be at least 4 characters" }
        }
        return { success: false, message: error.message }
    }
}

// CHANGE BIO
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

// UPDATE SOCIAL
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

        if (x.length > 0) {
            const user = await User.findByIdAndUpdate(session.user._id, { 'contact.twitter': x }, { new: true })
        }
        revalidatePath("/profile")
        return { success: true, message: 'Contact successfully updated', }

    } catch (error) {
        return { success: false, message: error.message }

    }
}

// ADD POST 
export const createPost = async (prevState, formData) => {
    const session = await auth()
    const postContent = formData.get("post")
    const user = await User.findById(session.user._id)
    try {
        connectToDb()
        if (!postContent) {
            return { success: false, message: 'Post cannot be empty' }
        }
        const post = new Post({ content: postContent, users: [user._id] })
        await post.save()
        await User.findByIdAndUpdate(user._id, { $push: { posts: post._id } }, { new: true })
        revalidatePath("/home")
        return { success: true, message: "Post successfully published" }
    } catch (error) {
        console.log(error)
        return { success: false, message: error.message }
    }
}

//UPDATE PFP
export const updatePfp = async (prevState, formData) => {
    const session = await auth()
    const file = formData.get('pfp')
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, async (error, result) => {
                if (error) {
                    console.error(error);
                    resolve({ success: false, message: 'File cannot be empty' });
                } else {
                    const user = await User.findByIdAndUpdate(session.user.id, { pfp: result.url }, { new: true });
                    revalidatePath("/");
                    resolve({ success: true, message: 'Profile picture updated successfully' });
                }
            }).end(buffer);
        });
    } catch (error) {
        return { success: false, message: error.message };
    }
}