import React, { useState, useEffect } from 'react';
import './App.css';
import APIService from './APIService';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function App() {
  const apiService = new APIService();
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await apiService.getTasks();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  const createTask = async (e: any) => {
    e.preventDefault();
    if (!newTaskDescription) {
      alert("Can't create an empty task");
      return;
    }
    const newTask = await apiService.createTask(newTaskDescription, new Date());
    setTasks([...tasks, newTask]);
    setTaskDescription("");
  };

  const deleteTask = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      const deletedTask = await apiService.deleteTask(id);
      if (deletedTask) {
        setTasks(tasks.filter(task => task._id !== id));
      }
    } catch (err) {
      alert("Error deleting task");
      return;
    }
  };

  const updateTask = async (e: any, id: string) => {
    e.stopPropagation();
    const payload = { completed: !tasks.find(task => task._id === id).completed };
    const updatedTask = await apiService.updateTask(id, payload);
    setTasks(tasks.map((task) => task._id === id ? updatedTask : task));

  };

  return (
    <div className="App">
      <div className="tasksHeader">
        <div className="headerText">ניהול משימות</div>
        <div className="inputTaskContainer">
          <input className="taskInput" type="text" value={newTaskDescription}
            onChange={({ target }) => setTaskDescription(target.value)}
            placeholder="הכנס תיאור משימה" />
          <button className="createTaskButton" type="button" onClick={createTask}>
            משימה חדשה
          </button>
        </div>
      </div>

      <div className="tasksTable">
        <div className="tasksTableHeader">
          <div className="tasksTableColumnCompleted">בוצעה</div>
          <div className="tasksTableColumnDescription">תיאור</div>
          <div className="tasksTableColumnCreationDate">תאריך יצירה</div>
          <div className="tasksTableColumnActions">פעולות</div>
        </div>
        {
          tasks.length ? tasks.map(({ _id, taskDescription, creationDate, completed }, i) => (
            <div className="tasksTableRow" key={i}>
              <div className="taskCompleted">{completed ? "כן" : "לא"}</div>
              <div className="taskDescription">{taskDescription}</div>
              <div className="taskCreationDate">{creationDate}</div>
              <div className="taskActions">
                <div className="updateTaskButton" onClick={e => updateTask(e, _id)}>
                  <EditIcon></EditIcon>
                  עריכה</div>
                <div className="deleteTaskButton" onClick={e => deleteTask(e, _id)}>
                  <DeleteIcon></DeleteIcon>
                  מחיקה</div>
              </div>
            </div>
          )) : <div className="tasksTableEmpty">אין משימות עדיין</div>}
      </div>
    </div>
  );
}

export default App;