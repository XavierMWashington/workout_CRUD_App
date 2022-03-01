import React, { useState } from 'react';
import Axios from 'axios';
import "../css/NewWorkoutForm.css"

// function newWorkout(sentName, sentUnit, sentCalories){
//     return [ sentName, sentUnit, sentCalories ];
// }

function NewWorkoutForm(){

    
  const [stateName, setName] = useState();
  const [stateUnitType, setUnitType] = useState();
  const [stateCalories, setCalories] = useState();



  const addToList = ()=> {
    console.log("Name: " + stateName);
    Axios.post(`https://workout-crud-app-backend.herokuapp.com/insert`, {name: stateName, unitType: stateUnitType, caloriesBurnedPerUnit: stateCalories});
    window.location.reload();
  }


    return (
    <div className='app-container'>
        <h1>
        CRUD app with MERN
        </h1>

        <div className='form-container'>

        <div className = "form">
            <label>Workout Name</label>
            <input type = "text" onChange={(event) => {
            setName(event.target.value);
            }}></input>
        </div>

        <div className='form'>
            <label>Unit Type</label>
            <input type = "text" onChange={(event) => {
            setUnitType(event.target.value);
            }}></input>
        </div>

        <div className='form'>
            <label>Calories per unit</label>
            <input type = "number" onChange={(event) => {
            setCalories(event.target.value);
            }}></input>      
        </div>

        </div>


        <button onClick={addToList}>
        Submit
        </button>

    </div>

    )
}

export default NewWorkoutForm ;
