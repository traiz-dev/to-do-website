import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "../components/home/Home";
import TaskCard from "../components/task-card/TaskCard";
import { URL } from "../utils/consts";
import Organiser from "../components/organiser/Organiser";
import Button from "../components/add-button/Button";
import Modal from "../components/modal/Modal";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <BrowserRouter>
      <Button openModal={openModal} />
      <Modal isModalOpen={isModalOpen} onClose={closeModal}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/tasks"
          element={<TaskCard tasks={tasks} setTasks={setTasks} />}
        />
        <Route path="/organiser" element={<Organiser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
