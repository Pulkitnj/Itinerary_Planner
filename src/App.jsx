import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (description) => {
    const newTask = { description, editing: false };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.reduce((acc, task, currentIndex) => {
      if (currentIndex !== index) {
        acc.push(task);
      }
      return acc;
    }, []);
    setTasks(updatedTasks);
  };

  const updateTask = (index, newDescription, editing) => {
    const updatedTasks = tasks.map((task, currentIndex) => {
      if (currentIndex === index) {
        return {
          ...task,
          description: newDescription,
          editing: editing
        };
      }
      return task;
    });
  
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Itinerary Planner</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
    </div>
  );
};

export default App;

