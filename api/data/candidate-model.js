const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
});

mongoose.model('Candidate', candidateSchema, 'candidate');
