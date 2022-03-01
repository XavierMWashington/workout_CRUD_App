const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
require('dotenv').config();

const WorkoutModel = require('./models/workoutSchema');
const { findById } = require('./models/workoutSchema');
const SessionModel = require('./models/sessionSchema');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors(
    {
        allowedHeaders: ["authorization", "Content-Type"],
        exposedHeaders: ["authorization"], 
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false
      }
));

const connectionString = process.env.MONGO_CONNECTION;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
});

app.get('/', (req, res) => {
    res.status(200).send("Welcome to the backend code. Not much to see visually here...");
})

/******************/
//POST methods
/*******************/

app.post('/insert', async (req, res) => {

    const submittedName = req.body.name;
    const submittedUnitType = req.body.unitType;
    const submittedCaloriesBurned = req.body.caloriesBurnedPerUnit;

    const workout = new WorkoutModel({name: submittedName, unitType: submittedUnitType, caloriesBurnedPerUnit: submittedCaloriesBurned});

    try{
        await workout.save();
        res.status(200).send('Data loaded successfully')
    } catch(err){
        console.log(err);
    }
});

app.post('/insert_session', async (req, res) => {
    const submittedName = req.body.name;
    const submittedWorkoutName = req.body.workoutName;
    const submittedCalories = req.body.calories;

    const session = new SessionModel({name: submittedName, workoutName: submittedWorkoutName, calories: submittedCalories});

    try{
        await session.save();
        res.status(200).send('Data loaded successfully');
    } catch (err) {
        console.log(err);
    }
});

/*********************
 * GET Methods
 **********************/

app.get("/read", (req, res) => {
    WorkoutModel.find({}, (err, result) => {
        if(err){
            res.send(err);
            return
        }

        if(result){
            res.send(result);
            return
        }

        console.log("Nothing Found...");
        res.send("Nothing was found in the database...");

    });
});

app.get("/read_sessions", (req, res) => {
    SessionModel.find({}, (err, result) => {
        if(err){
            res.send(err);
            return;
        }

        if(result){
            res.send(result);
            return;
        }

        console.log("Nothing Found...");
        res.send("Nothing was found in the database");
    });
});

/**********************
 * PUT Methods
 **********************/

app.put("/update_name", async (req, res) => {
    const newWorkoutName = req.body.name;
    const id = req.body.id;

    try{
        //Note, .save() is a callback. Making the code below await will run the query twice
        WorkoutModel.findById(id, (err, updatedWorkout) => {
            updatedWorkout.name = newWorkoutName;
            updatedWorkout.save();
        });
    } catch (err){
        console.log(err);
    }
});

app.put("/update_unit_type", async (req, res) => {
    const newUnitType = req.body.unitType;
    const id = req.body.id;

    try{
        WorkoutModel.findById(id, (err, updatedWorkout) => {
            updatedWorkout.unitType = newUnitType;
            updatedWorkout.save();
        });
    } catch (err){
        console.log(err);
    }
});


app.put("/update_calories_burned_per_unit", async (req, res) => {
    const newCaloriesBurned = req.body.caloriesBurnedPerUnit;
    const id = req.body.id;

    try{
        WorkoutModel.findById(id, (err, updatedWorkout) => {
            updatedWorkout.caloriesBurnedPerUnit = newCaloriesBurned;
            updatedWorkout.save();
        });
    } catch (err){
        console.log(err);
    }
});

/***************
 * DELETE methods
 ***************/

app.delete('/delete/:id', async (req, res)=>{
    const id = req.params.id;
    await WorkoutModel.findByIdAndRemove(id).exec();
    res.send('workout deleted');
});

app.delete('/delete_session/:id', async (req, res) => {
    const id = req.params.id;
    await SessionModel.findByIdAndRemove(id).exec();
    res.send('workout deleted');
})

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
});

