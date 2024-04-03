import User from "./models/user"
import Post from "./models/post"
import { connectToDb } from "./utils"
connectToDb()

export const getUser = async({numberOfItems,skipSetItems} )=>{
    try {
        const count = await User.countDocuments();
        const user = await User.find().limit(numberOfItems).skip(skipSetItems)
        const totalPage = Math.ceil(count / numberOfItems)
        return {data: user, count, totalPage}
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const getPosts = async({numberOfItems,skipSetItems}) =>{
    console.log(numberOfItems)
    try {
        const post = await Post.find().populate('users').limit(numberOfItems).skip(skipSetItems)
        
        return {success: true, post: post}
    } catch (error) {
        console.error(error)
        throw new Error("Error")
    }
}