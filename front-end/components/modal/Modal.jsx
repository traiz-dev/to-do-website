import React, { useState } from 'react'
import { FiX } from "react-icons/fi";
import { URL } from "/utils/consts";
import { toast, Toaster } from 'react-hot-toast'

const Modal = ({ isModalOpen, onClose }) => {
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0)

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedStartDate = startDate.replace("T", " ") + ":00";
      const formattedEndDate = endDate.replace("T", " ") + ":00";

      if (
        title.length === 0 ||
        startDate.length === 0 ||
        endDate.length === 0 ||
        description.length === 0 ||
        priority === 0
      ) {
        toast.error("You need to fill in all input fields!");
        return;
      }

      const response = await fetch(URL + "/api/create_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          startTime: formattedStartDate,
          endTime: formattedEndDate,
          content: description,
          priorityLevel: priority,
        }),
      });

      if (!response.ok) {
        toast.error("There was an error with a server response!");
      }

      setTimeout(() => {
        toast.success("Task created successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }, 500);

    } catch(error) {
      console.error("There was an error! " + error.message)
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {isModalOpen && (
        <>
          <div className="fixed left-0 top-0 z-50 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
            <div className="absolute left-[31%] top-[2%] z-20">
              <button
                onClick={onClose}
                className="absolute top-[107px] right-6 text-white font-bold hover:text-gray-600 transition-all duration-150"
              >
                <FiX />
              </button>
              <div className="flex flex-col items-center justify-center h-screen dark">
                <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="flex justify-center mb-2">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">
                      Add New Task
                    </h2>
                  </div>

                  <form className="flex flex-wrap">
                    <input
                      type="text"
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[100%] mr-[2%]"
                      placeholder="Name"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <h2 className="text-l uppercase font-bold text-gray-200 mb-4 w-full">
                      Start date and time
                    </h2>
                    <input
                      type="datetime-local"
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[100%] mr-[2%]"
                      placeholder="Start Date and Time"
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <h2 className="text-l uppercase font-bold text-gray-200 mb-4 w-full">
                      End date and time
                    </h2>
                    <input
                      type="datetime-local"
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[100%] mr-[2%]"
                      placeholder="End Date and Time"
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <h2 className="text-l uppercase font-bold text-gray-200 mb-4 w-full">
                      Priority
                    </h2>
                    <select
                      id="prio"
                      className="w-full mr-2 mb-4"
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="select">Select</option>
                      <option value="1">Important</option>
                      <option value="2">Medium</option>
                      <option value="3">Not Important</option>
                    </select>
                    <h2 className="text-l uppercase font-bold text-gray-200 mb-4 w-full">
                      Description of task
                    </h2>
                    <textarea
                      name="content"
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-auto md:mb-auto md:w-full md:h-auto md:min-h-[100px] md:max-h-[100px] md:flex-grow md:flex-shrink md:flex-auto focus:bg-gray-md:focus:outline-none:focus:ring-blue-md:focus:border-transparent transition ease-in-out duration-fastest"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    <button
                      type="submit"
                      onClick={onSubmit}
                      className="uppercase w-full bg-gradient-to-r  from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition duration-150"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Modal
