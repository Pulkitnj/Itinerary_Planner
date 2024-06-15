import React from 'react';

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  const handleKeyPress = (event, index, newDescription) => {
    if (event.key === 'Enter') {
      updateTask(index, newDescription, false);
    }
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task.editing ? (
            <>
              <input
                type="text"
                value={task.description}
                onChange={(e) => updateTask(index, e.target.value, true)}
                onBlur={() => updateTask(index, task.description, false)}
                onKeyPress={(e) => handleKeyPress(e, index, e.target.value)}
                autoFocus
              />
              <button onClick={() => updateTask(index, task.description, false)}>Update</button>
            </>
          ) : (
            <>
              {task.description}
              <button onClick={() => deleteTask(index)}>Delete</button>
              <button onClick={() => updateTask(index, task.description, true)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

