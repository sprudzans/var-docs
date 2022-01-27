const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref:'Account', required: true},
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'Name cannot be more than 40 characters']
    },
    text: {
        type: String,
        required: [true, 'Please add a text'],
    },
    variables: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.models.Sample || mongoose.model('Sample', sampleSchema);