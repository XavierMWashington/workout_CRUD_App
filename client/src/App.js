import React from 'react';
import './css/App.css';
import NewWorkoutForm from './components/NewWorkoutForm';
import Session from './components/Session';
import WorkoutList from './components/WorkoutList';

function App() {

    return (
      <div>
          <NewWorkoutForm />
          <Session />
          <WorkoutList />
      </div>
    );

}

export default App;
