import User from "./models/user"
import Post from "./models/post"
import { connectToDb } from "./utils"
connectToDb()

export const getUser = async (username) => {
    try {
        const user = await User.findOne({ username: username })
        console.log(user.username)
        return user.username
    } catch (error) {
        return null
    }
}



export const getPosts = async ({ numberOfItems, skipSetItems }) => {
    try {
        const count = await Post.countDocuments();
        const post = await Post.find()
            .populate({ path: 'users', select: 'id username pfp' })
            .sort({ createdAt: -1 })
            .limit(numberOfItems)
            .skip(skipSetItems)
        const totalPage = Math.ceil(count / numberOfItems)
        return { success: true, post: post, count, totalPage }
    } catch (error) {
        console.error(error)
        throw new Error("Error")
    }
}

export const userInfo = async (username) => {
    try {
        const user = await User.findOne({ username: username }).populate({ path: "posts", select: "content" })
        return user
    } catch (error) {
        return { success: false, message: error.message };
    }
}