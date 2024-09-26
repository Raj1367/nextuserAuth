import mongoose from "mongoose";

const userSchmea = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    profilepic: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,

    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    forgotpasswordToken: String,

    forgotpasswordTokenExpiry: Date,

    verifyToken: String,

    verifyTokenExpiry: Date,

})

const userModel = mongoose.models.Authusers || mongoose.model("Authusers", userSchmea)

export default userModel
