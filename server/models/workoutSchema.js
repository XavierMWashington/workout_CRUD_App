const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    unitType: {
        type: String,
        required: true,
    },
    caloriesBurnedPerUnit: {
        type: Number,
        required: true,
    },
});


const Workouts = mongoose.model("Workout", WorkoutSchema, "Workouts");
module.exports = Workouts;