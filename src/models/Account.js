import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
}, {
    timestamps: true
})

const Account = mongoose.models.Account || mongoose.model('Account', accountSchema)

export default Account;