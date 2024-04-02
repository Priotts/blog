import User from "./models/user"
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

export const getData = async( ) =>{
    try {

    } catch (error) {
        console.error(error)
        throw new Error("Error")
    }
}