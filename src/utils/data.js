import User from "./models/user"
import { connectToDb } from "./utils"
connectToDb()

export const getUser = async()=>{
    try {
        const user = await User.find()
        // console.log(user)
        return user;
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