import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { IoIosSettings } from 'react-icons/io';
import { IoIosCheckmark } from 'react-icons/io';
import { IoIosClose } from 'react-icons/io';

import '../css/WorkoutList.css'


function WorkoutList() {


  
  const [workoutList, setWorkoutList] = useState([]);

  const [nameEditingArray, setNameEditingArray] = useState([]);
  const [displayNameArray, setDisplayNameArray] = useState([]);

  const [unitTypeEditingArray, setUnitTypeEditingArray] = useState([]);
  const [displayUnitTypeArray, setDisplayUnitTypeArray] = useState([]);

  const [caloriesEditingArray, setCaloriesEditingArray] = useState([]);
  const [displayCaloriesArray, setDisplayCaloriesArray] = useState([]);
 

  let newName = '';
  let newUnitType = '';
  let newCalories = 0;

  const updateName = (valueID) => {
    // console.log(valueID)
    Axios.put('https://workout-crud-app-backend.herokuapp.com/update_name', { id: valueID, name: newName});
  }

  const updateUnitType = (valueID) => {
    Axios.put('https://workout-crud-app-backend.herokuapp.com/update_unit_type', { id: valueID, unitType: newUnitType});
  }

  const updateCalories = (valueID) => {
    Axios.put('https://workout-crud-app-backend.herokuapp.com/update_calories_burned_per_unit', {id: valueID, caloriesBurnedPerUnit: newCalories});
  }


  const deleteWorkout = (valueID, valueKey) => {
    Axios.delete(`https://workout-crud-app-backend.herokuapp.com/delete/${valueID}`);
    const tempArray = new Array(workoutList.length);
    workoutList.map((val, i) => {
      tempArray[i] = val;
    });

    tempArray.splice(valueKey, 1)
    setUpStateArrays(tempArray);
    setWorkoutList(tempArray);

    spliceBoolArray([nameEditingArray, setNameEditingArray], valueKey);
    spliceBoolArray([unitTypeEditingArray, setUnitTypeEditingArray], valueKey);
    spliceBoolArray([caloriesEditingArray, setCaloriesEditingArray], valueKey);
  
  }

  useEffect(() => {
     async function fetchData(){ 
      await Axios.get('https://workout-crud-app-backend.herokuapp.com/read').then((response) => {
      setWorkoutList(response.data);

      const boolArray = new Array(response.data.length);
      boolArray.fill(false);

      setNameEditingArray(boolArray);
      setUnitTypeEditingArray(boolArray);
      setCaloriesEditingArray(boolArray);

      const namesArray = new Array(response.data.length);
      const unitTypeArray = new Array(response.data.length);
      const caloriesArray = new Array(response.data.length);

      response.data.map((data, key) => {
        namesArray[key] = data.name;
        unitTypeArray[key] = data.unitType;
        caloriesArray[key] = data.caloriesBurnedPerUnit;
        return null;
      });

      setDisplayNameArray(namesArray);
      setDisplayUnitTypeArray(unitTypeArray);
      setDisplayCaloriesArray(caloriesArray);

    });
  }

  fetchData();

  }, []);

  const setUpStateArrays = function(mainList){
    //set boolArray equal to boolList
    const boolArray = new Array(mainList.length);
    boolArray.fill(false);


    setNameEditingArray(boolArray);
    setUnitTypeEditingArray(boolArray);
    setCaloriesEditingArray(boolArray);

    //the mainlist will take over as the response.data

    const namesArray = new Array(mainList.length);
    const unitTypeArray = new Array(mainList.length);
    const caloriesArray = new Array(mainList.length);

    //will do take over as response.data here as well
    mainList.map((data, key) => {
      namesArray[key] = data.name;
      unitTypeArray[key] = data.unitType;
      caloriesArray[key] = data.caloriesBurnedPerUnit;
    });

    setDisplayNameArray(namesArray);
    setDisplayUnitTypeArray(unitTypeArray);
    setDisplayCaloriesArray(caloriesArray);

  }
  
  const spliceBoolArray = function(currentBoolState, index){
    const tempArray = new Array(currentBoolState[0].length);
    currentBoolState[0].map((bool, i) => {
      tempArray[i] = bool;
      console.log(bool);
    });
    tempArray.splice(index, 1);
    console.log(tempArray.length);
    currentBoolState[1](tempArray);
  }

  const flipEditingState = (index, stateArray) => {
    
    let newBoolArray = stateArray[0].map((i) => i);
    
    if(stateArray[0][index]){
      newBoolArray[index] = false;
      stateArray[1](newBoolArray);

    } else {
      newBoolArray[index] = true;
      stateArray[1](newBoolArray);

    }
  }

  const updateNewValue = (event) => {
    if(event.target.id === 'workout-new-name'){
      newName = event.target.value;
    }

    else if (event.target.id === 'workout-new-unit-type'){
      newUnitType = event.target.value;
    }

    else if(event.target.id === 'workout-new-calorie'){
      newCalories = parseFloat(event.target.value);
      // console.log(newCalories);
    }
  }

  const submitUpdatedData = (clickEvent, valueIndex, stateDisplayArray, stateEditArray) => {

    let tempArray = new Array(workoutList.length).fill('');
    stateDisplayArray[0].map( (stateValue, key) => {
      tempArray[key] = stateValue;
    });


    if(clickEvent.target.id === 'name-button'){
      tempArray[valueIndex] = newName;
      updateName(workoutList[valueIndex]._id);
    }

    else if(clickEvent.target.id === 'unit-type-button'){
      tempArray[valueIndex] = newUnitType;
      updateUnitType(workoutList[valueIndex]._id);
    }

    else if(clickEvent.target.id === 'calories-burned-button'){
      //console.log("Reached");
      tempArray[valueIndex] = newCalories;
      updateCalories(workoutList[valueIndex]._id);    
    } else {
      //console.log("None is reached");
    }

    stateDisplayArray[1](tempArray);
    flipEditingState(valueIndex, stateEditArray);
  }


  const dataName = (value, valueKey) => {

    if(!nameEditingArray[valueKey]){    
    return(
      <div>
        <button className='data-button' onClick={() => flipEditingState(valueKey, [nameEditingArray, setNameEditingArray])}><IoIosSettings /></button>
        {value}
      </div>
    )};

    return(
      <div>
        <input type= "text" placeholder='Enter new name' id='workout-new-name'  onChange={updateNewValue}></input>
        <br />
        <button className='' id = 'name-button' onClick = {(event) => submitUpdatedData(event, valueKey, [displayNameArray, setDisplayNameArray], [nameEditingArray, setNameEditingArray])}><div className='unclickable-icon'> < IoIosCheckmark /> </div></button>
        <button className='' onClick = {() => flipEditingState(valueKey, [nameEditingArray, setNameEditingArray])}> <IoIosClose /> </button>
      </div>
    );
  };

  const dataUnitType = (value, valueKey) => {

    if(!unitTypeEditingArray[valueKey]){    
    return(
      <div className='workout-data'>
        <button className='data-button' onClick={() => flipEditingState(valueKey, [unitTypeEditingArray, setUnitTypeEditingArray])}><IoIosSettings /></button>
        <label>Unit Type: </label>
        {value}
      </div>
    )};

    return(
      <div className='workout-data'>
        <label>Unit Type:</label>
        <input type= "text" placeholder='Enter new unit type' id='workout-new-unit-type'  onChange={updateNewValue}></input>
        <button className='' id = 'unit-type-button' onClick = {(event) => submitUpdatedData(event, valueKey, [displayUnitTypeArray, setDisplayUnitTypeArray], [unitTypeEditingArray, setUnitTypeEditingArray])}> <div className='unclickable-icon'><IoIosCheckmark /></div></button>
        <button className='' onClick = {() => flipEditingState(valueKey, [unitTypeEditingArray, setUnitTypeEditingArray])}><IoIosClose /></button>
      </div>
    );
  };

  const dataCalories = (value, unitValue, valueKey) => {

    if(!caloriesEditingArray[valueKey]){    
    return(
      <div className='workout-data'>
        <button className='data-button' onClick={() => flipEditingState(valueKey, [caloriesEditingArray, setCaloriesEditingArray])}><IoIosSettings /></button>
        <label>Calories burned per {unitValue}: </label>
        {value}
      </div>
    )};

    return(
      <div className='workout-data'>
        <label >New Amount:</label>
        <input type= "number" id='workout-new-calorie' onChange={updateNewValue}></input>
        <button id = 'calories-burned-button' onClick = {(event) => submitUpdatedData(event, valueKey, [displayCaloriesArray, setDisplayCaloriesArray], [caloriesEditingArray, setCaloriesEditingArray])}><div className='unclickable-icon'><IoIosCheckmark onClick={() => {console.log("Do Nothing")}}/></div> </button>
        <button className='' onClick = {() => flipEditingState(valueKey, [caloriesEditingArray, setCaloriesEditingArray])}><IoIosClose /></button>
      </div>
    );
  };

  return (
    <div className="App">
      <div className='info-container'> 
        <h1>
          Your List of Workouts
        </h1>
        {workoutList.map((val, key) => {
          return (
            <div className='data-container'> 
              <h2 className='workout-data-name'>
                {dataName(displayNameArray[key], key)}
              </h2>

              {dataUnitType(displayUnitTypeArray[key], key)} 

              {/* <button className='data-button'><IoIosSettings /></button> <label>Calories burned per unit:</label> {val.caloriesBurnedPerUnit} */}
              {dataCalories(displayCaloriesArray[key], displayUnitTypeArray[key], key)}

              <button onClick={() => {deleteWorkout(workoutList[key]._id, key)}}>
                Delete
              </button>

            </div>
          )
        })}
      </div>

    </div>
  );
}

export default WorkoutList;
