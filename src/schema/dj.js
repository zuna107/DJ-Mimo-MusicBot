const { Schema, model } = require('mongoose');

let Dj = new Schema({
    Guild: {
        type: String,
        required: true
    },
    Roles: {
        type: [String], // Use [String] for an array of strings
        default: [] // Default to an empty array
    },
    Mode: {
        type: Boolean,
        default: false
    },
});

module.exports = model('dj', Dj);
