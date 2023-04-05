import React, { useState } from "react";
// import "./styles.css";
import "./task.css";

const tasksData = [
  {
    id: 1,
    name: "Frontend page",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget urna quis libero sollicitudin laoreet eu quis ante.",
    deadline: "2023-03-10",
    status: "pending"
  },
  {
    id: 2,
    name: "Backend database",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget urna quis libero sollicitudin laoreet eu quis ante.",
    deadline: "2023-03-15",
    status: "completed"
  },
  {
    id: 3,
    name: "Blockchain",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget urna quis libero sollicitudin laoreet eu quis ante.",
    deadline: "2023-03-20",
    status: "pending"
  },
  {
    id: 4,
    name: "Payment Gateway",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget urna quis libero sollicitudin laoreet eu quis ante.",
    deadline: "2023-03-25",
    status: "completed"
  }
];

const TaskDetails = ({ task }) => (
  <div className="task-details">
    <h3>{task.name}</h3>
    <p>{task.description}</p>
    <div className="task-deadline">
      <p>Deadline: {task.deadline}</p>
      {task.status === "pending" && (
        <button className="mark-complete-btn">Mark as Complete</button>
      )}
    </div>
  </div>
);

const ViewTask = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="app">
      <h1>Update KRA</h1>
      <div className="assigned-tasks">
        <div className="tasks">
          <h2>Tasks</h2>
          {tasksData.map((task) => (
            <div
              key={task.id}
              className="task"
              onClick={() => handleTaskClick(task)}
            >
              <p>{task.name}</p>
            </div>
          ))}
        </div>
        <div className="status">
          <h2>Status</h2>
          {tasksData.map((task) => (
            <div key={task.id} className="task">
              <p>{task.status}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedTask && <TaskDetails task={selectedTask} />}
    </div>
  );
};

export default ViewTask;

/* CSS */

