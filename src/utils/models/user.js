import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        min: 4,
        validate: {
            validator: (v) => v.length >= 4,
            message: 'Username must be at least 4 characters'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    bio: {
        type: String
    },
    pfp: {
        type: String,
        default: "/defaultPFP.svg",
    },
    password: {
        type: String,
        // required: true
    },
    follower: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }]
}, { timestamps: true });

const User = mongoose.models?.User || mongoose.model('User', userSchema)
module.exports = User;