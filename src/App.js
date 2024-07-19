import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [numWorkers, setNumWorkers] = useState(1);
  const [tasks, setTasks] = useState([{ name: '', priority: 1, time: 1 }]);
  const [assignment, setAssignment] = useState([]);

  const handleNumWorkersChange = (e) => {
    setNumWorkers(parseInt(e.target.value));
  };

  const handleTaskChange = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const addTaskRow = () => {
    setTasks([...tasks, { name: '', priority: 1, time: 1 }]);
  };

  const assignTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => b.priority - a.priority || b.time - a.time);
    const workerLoads = Array(numWorkers).fill(0);
    const taskAssignment = Array.from({ length: numWorkers }, () => []);

    sortedTasks.forEach((task) => {
      const minLoadWorker = workerLoads.indexOf(Math.min(...workerLoads));
      taskAssignment[minLoadWorker].push(task);
      workerLoads[minLoadWorker] += parseInt(task.time);
    });

    setAssignment(taskAssignment.map((tasks, index) => ({
      worker: index + 1,
      tasks,
      totalLoad: workerLoads[index]
    })));
  };

  return (
    <div className="App">
      <h1>Task Assignment</h1>
      <div>
        <label htmlFor="num-workers">Number of People:</label>
        <input
          type="number"
          id="num-workers"
          value={numWorkers}
          onChange={handleNumWorkersChange}
          min="1"
          required
        />
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Priority</th>
            <th>Time (Hr)</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => handleTaskChange(index, 'name', e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={task.priority}
                  onChange={(e) => handleTaskChange(index, 'priority', parseInt(e.target.value))}
                  min="1"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={task.time}
                  onChange={(e) => handleTaskChange(index, 'time', parseInt(e.target.value))}
                  min="1"
                  required
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addTaskRow}>
        Add Task
      </button>
      <br /><br />
      <button type="button" onClick={assignTasks}>
        Assign Tasks
      </button>
      <h2>Task Assignment Results</h2>
      {assignment.map(({ worker, tasks, totalLoad }) => (
        <div key={worker}>
          <h3>Worker {worker} (Total Load: {totalLoad})</h3>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task.name} (Priority: {task.priority}, Time: {task.time})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
