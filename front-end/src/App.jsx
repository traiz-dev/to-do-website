import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "../components/home/Home";
import TaskCard from "../components/task-card/TaskCard";
import { URL } from "../utils/consts";
import Organiser from "../components/organiser/Organiser";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(URL + "/api/tasks");

      if (!response.ok) {
        console.log("There was an error!");
      }

      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("There was an error! Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskCard tasks={tasks}/>} />
        <Route path="/organiser" element={<Organiser/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
