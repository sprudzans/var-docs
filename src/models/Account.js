import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    role: {type: String, required: true}
}, {
    timestamps: true
})


module.exports = mongoose.models.Account || mongoose.model('Account', accountSchema)