import mongoose from "mongoose";
const { Schema } = mongoose

const postSchema = new Schema({
    content: {
        type: String,
        required: true,
        lowercase: true,
        min: [10, 'Content must be at least 10 characters'],
        max: [160, 'Content must be at most 160 characters']
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
}, { timestamps: true });

const Post = mongoose.models?.Post || mongoose.model('Post', postSchema)
module.exports = Post;
