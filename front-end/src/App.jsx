import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "../components/home/Home";
import TaskCard from "../components/to-do/TaskCard";
import { URL } from "../utils/consts";
import Organiser from "../components/organiser/Organiser";
import Button from "../components/add-button/Button";
import Modal from "../components/modal/Modal";
import ToDo from "../components/to-do/ToDo";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <BrowserRouter>
      <Button openModal={openModal} />
      <Modal isModalOpen={isModalOpen} onClose={closeModal}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/tasks"
          element={<ToDo/>}
        />
        <Route path="/organiser" element={<Organiser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
