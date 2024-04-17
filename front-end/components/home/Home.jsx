import React, { useEffect, useState } from "react";
import { URL } from "../../utils/consts";
import TaskCard from "../task-card/TaskCard";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(URL + "/tasks");

      if (!response.ok) {
        console.log("There was an error!");
      }

      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("There was an error! Error: " + error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="grid">
      <TaskCard tasks={tasks} />
    </div>
  );
};

export default Home;
