const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    workoutName: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
});


const Session = mongoose.model("Session", SessionSchema, "Sessions");
module.exports = Session;