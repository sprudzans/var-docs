const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    host: {type: mongoose.Schema.Types.ObjectId, ref:'Account', required: true},
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: true
    },
    description: {
        type: String,
        required: true
    },
    square: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.models.Room || mongoose.model('Room', RoomSchema);