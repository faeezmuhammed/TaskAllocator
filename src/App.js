import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [numMembers, setNumMembers] = useState(1);
  const [tasks, setTasks] = useState([{ name: '', priority: 1, time: 1 }]);
  const [assignment, setAssignment] = useState([]);

  const handleNumMembersChange = (e) => {
    setNumMembers(parseInt(e.target.value));
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
    const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority || b.time - a.time);
    const memberLoads = Array(numMembers).fill(0);
    const taskAssignment = Array.from({ length: numMembers }, () => []);

    sortedTasks.forEach((task) => {
      const minLoadMember = memberLoads.indexOf(Math.min(...memberLoads));
      taskAssignment[minLoadMember].push(task);
      memberLoads[minLoadMember] += parseInt(task.time);
    });

    setAssignment(taskAssignment.map((tasks, index) => ({
      member: index + 1,
      tasks,
      totalLoad: memberLoads[index]
    })));
  };

  return (
    <div className="App">
      <h1>Task Assignment</h1>
      <div>
        <label htmlFor="num-members">Number of Team Members:</label>
        <input
          type="number"
          id="num-members"
          value={numMembers}
          onChange={handleNumMembersChange}
          min="1"
          required
        />
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Time</th>
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
      {assignment.map(({ member, tasks, totalLoad }) => (
        <div key={member}>
          <h3>Team Member {member} (Total Load: {totalLoad})</h3>
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
