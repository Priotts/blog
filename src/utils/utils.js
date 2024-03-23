const mongoose = require('mongoose');
require('dotenv').config();

const connection = {}

export const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log('Using  existing connection')
            return
        }
        const db = await mongoose.connect(process.env.DBURL)
        connection.isConnected = db.connections[0].readyState
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}