import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: false,
        unique: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true } );

export default mongoose.model("User", UserSchema)