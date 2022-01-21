const mongoose = require('mongoose');

const DocSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref:'Account', required: true},
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [200, 'Description cannot be more than 40 characters']
    }
}, {
    timestamps: true
})

module.exports = mongoose.models.Doc || mongoose.model('Doc', DocSchema);