import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import Calendar from "./Calendar";
import { URL } from "../../utils/consts";

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

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
    <div>
      <label className="fixed bottom-5 left-5 inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={() => setShowCalendar(!showCalendar)} // Toggle showCalendar state
        />
        <div
          className={`peer ring-0 bg-blue-400  rounded-full outline-none duration-300 after:duration-500 w-12 h-12  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-10 after:w-10 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0`}
        ></div>
      </label>
      {showCalendar ? (
        <Calendar />
      ) : (
        <TaskCard tasks={tasks} setTasks={setTasks} />
      )}
    </div>
  );
};

export default ToDo;
