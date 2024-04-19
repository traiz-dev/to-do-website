import React from "react";
import { FaExclamation } from "react-icons/fa6";
import { MdOutlineRemoveDone } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";

const TaskCard = ({ tasks }) => {
  const chunkArray = (array, size) => {
    return array.reduce((chunks, item, i) => {
      if (i % size === 0) {
        chunks.push([item]);
      } else {
        chunks[chunks.length - 1].push(item);
      }
      return chunks;
    }, []);
  };

  // Chunk tasks into arrays of size 4
  const chunkedTasks = chunkArray(tasks, 4);

  return (
    <div className="pt-[45px] pb-[45px] flex flex-wrap justify-center gap-[50px]">
      {chunkedTasks.map((taskGroup, index) => (
        <div className="flex flex-col items-center" key={index}>
          {taskGroup.map((task) => {
            const lastUpdatedISO = new Date(task.lastUpdated).toISOString();
            const lastUpdatedDate = new Date(lastUpdatedISO);
            const day = lastUpdatedDate.getDate();
            const month = lastUpdatedDate.toLocaleString("default", {
              month: "short",
            });
            const year = lastUpdatedDate.getFullYear();
            const weekday = lastUpdatedDate.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const formattedDate = `${weekday}, ${day} ${month.toUpperCase()} ${year}`;

            let svgIcon;

            if (task.priorityLevel === 3) {
              svgIcon = <FaExclamation className="text-green-500" />;
            } else if (task.priorityLevel === 2) {
              svgIcon = (
                <span className="flex">
                  <FaExclamation className="text-orange-500" />
                  <FaExclamation className="ml-[-8px] text-orange-500" />
                </span>
              );
            } else if (task.priorityLevel === 1) {
              svgIcon = (
                <span className="flex">
                  <FaExclamation className="text-red-600" />
                  <FaExclamation className="ml-[-8px] text-red-600" />
                  <FaExclamation className="ml-[-8px] text-red-600" />
                </span>
              );
            }

            return (
              <div
                className="relative bg-white w-[400px] h-[230px] rounded-md py-4 px-6 border hover:bg-gray-200 duration-500 my-4"
                key={task.id}
              >
                <p className="absolute top-5 left-5">{svgIcon}</p>
                <h3 className="text-center font-bold text-xl text-gray-800 pb-2 mr-3">
                  {task.isDone ? "DONE" : "NOT DONE"}
                </h3>
                <h3 className="text-base font-semibold text-gray-900 text-nowrap overflow-hidden overflow-ellipsis">
                  {task.title}
                </h3>
                <p className="text-xs text-gray-500 pb-4 text-nowrap overflow-hidden overflow-ellipsis">
                  {task.content}
                </p>
                <div className="flex justify-center pb-2">
                  <button className={`relative flex justify-center w-full py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r ${task.isDone ? "before:from-green-500" : "before:from-red-500"} ${task.isDone ? "before:to-green-300": "before:to-red-300" } before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0`}>
                    {task.isDone ? (
                      <MdOutlineDoneAll />
                    ) : (
                      <MdOutlineRemoveDone />
                    )}
                  </button>
                </div>
                <div className="flex gap-2 text-sm text-gray-500 border-b pb-2">
                  <p className="">last update:</p>
                  <p>{formattedDate}</p>
                </div>
                <div className="flex justify-around items-center py-3">
                  <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                    <svg
                      className="w-6 stroke-green-700"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <button className="font-semibold text-sm text-green-700">
                      Edit
                    </button>
                  </div>
                  <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                    <svg
                      className="w-6 stroke-red-700"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    <button className="font-semibold text-sm text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
