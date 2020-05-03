import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTasks, setActiveTasks] = useState([]);

  useEffect(() => {
    console.log("Effect has been run");
    getActiveTasks();
  }, []);

  const getActiveTasks = async () => {
    //add await every time we have a promise
    const response = await fetch(
      `/todos/active`
    );
    const data = await response.json();
    console.log(data);
    setActiveTasks(data);
  };

  return (
    <div className="App">
      <h1>Weekly Todos</h1>
    </div>
  );
}

export default App;
