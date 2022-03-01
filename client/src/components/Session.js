import { React, useState, useEffect } from 'react';
import Axios from 'axios'
import '../css/Session.css';

function Session() {



    const [newSessionActivated, setNewSessionActivated] = useState(false);
    const [sessionName, setSessionName] = useState('');
    const [workoutList, setWorkoutList] = useState([]);
    const [dropdownActivated, setDropdownActivated] = useState(false);
    const defaultChoice = "Choose Your Workout";
    const [workoutChoice, setWorkoutChoice] = useState(defaultChoice);
    const [workoutData, setWorkoutData] = useState();
    const [unitAmount, setUnitAmount] = useState(0);
    const [sessionList, setSessionList] = useState([]);

    useEffect(() => {
        async function fetchData(){
            await Axios.get('https://workout-crud-app-backend.herokuapp.com/read').then(response => {
                setWorkoutList(response.data);
            });

            await Axios.get('https://workout-crud-app-backend.herokuapp.com/read_sessions').then(response => {
                setSessionList(response.data);
            })
        }

        fetchData();

    }, []);

    //Special toggle, since the condition of sessionActivated affects multiple other element
        //It toggles and also restores the default data of all the new session section
    function toggleSection(){
        if(!newSessionActivated){
            setNewSessionActivated(true);
        } else {
            setNewSessionActivated(false);
            setDropdownActivated(false);
            setWorkoutChoice(defaultChoice);
            setUnitAmount(0);
        }
    }

    //Used to pick a selection and gather the matching workout data
    function selectChoice(selection){
        setDropdownActivated(false);
        setWorkoutChoice(selection);
        workoutList.map(item => {
            if(item.name === selection){
                setWorkoutData(item);
            }

            return null;
        });
    }

    function toggle(targetBoolState){
        targetBoolState[1](!targetBoolState[0]);
        //console.log(newSessionActivated);
    }


    function saveData(){
        const caloriesBurned = workoutData.caloriesBurnedPerUnit * unitAmount;
        console.log(caloriesBurned);
        Axios.post('https://workout-crud-app-backend.herokuapp.com/insert_session', { name: sessionName, workoutName: workoutData.name, calories: caloriesBurned.toFixed(2)}); 
        window.location.reload();
    }

    function deleteData(valueID){
        Axios.delete(`https://workout-crud-app-backend.herokuapp.com/delete_session/${valueID}`);
        window.location.reload();
    }

    return (
        <div className='session-container'>
            <h1>
                Sessions
            </h1>
            <div>
                <button className='new-session-button' onClick={toggleSection}>Add New</button>
            </div>

            <hr />

            {newSessionActivated && (
                <div>
                    <label className='session-name'>Name this session:</label>
                    <input type = "text" placeholder='name...' onChange= {(event) => setSessionName(event.target.value)}></input>
                </div>
            )}

            <br />

            {(sessionName !== '' || workoutChoice !== defaultChoice) && (
                <div className='new-session-section'>
                    <div className='dropdown-header' role="button" onClick={() => toggle([dropdownActivated, setDropdownActivated])}>{ workoutChoice }</div>
                    <div className='dropdown-container'>
                        {dropdownActivated && workoutList.map(workout => (
                            <p className='dropdown-item' role= "button" onClick={() => selectChoice(workout.name)}>{ workout.name }</p>
                        ))}
                    </div>
                </div>
            )}

            { workoutChoice !== defaultChoice && (
                <div className='counter-container'>
                    <label className='counter-label'>Number of { workoutData.unitType } done</label>
                    <input type="number" className='counter-input' placeholder='amount' onChange={(event) => setUnitAmount(event.target.value)}></input>
                </div>
            )}

            { unitAmount !== 0  && (
                <div>
                    <button className='session-save-button' onClick={saveData}>save</button>
                </div>
            )}

            <div className='database-sessions'>
                {sessionList.map((item) => {
                   return(
                    <div className='session-item'>
                        <h2 className='session-item-title'>{item.name}</h2>
                        <p>Workout Name: {item.workoutName}</p>
                        <p>Calories Burned: {item.calories}</p>
                        <button onClick={() => deleteData(item._id)}>delete</button>
                    </div>
                    );
                })}
            </div>

        </div>
        );

}

export default Session;
