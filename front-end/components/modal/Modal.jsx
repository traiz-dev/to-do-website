import React, { useState } from 'react'
import { FiX } from "react-icons/fi";
import { URL } from "/utils/consts";

const Modal = ({ isModalOpen, onClose }) => {
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const formattedStartDate = startDate.replace("T", " ") + ":00";
      const formattedEndDate = endDate.replace("T", " ") + ":00";

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
        console.log("There was an error with a response!");
      }

      console.log("Data submitted successfully!");
    } catch(error) {
      console.error("There was an error! " + error.message)
    }
  }

  return (
    <>
      {isModalOpen && (
        <>
          <div className="fixed left-0 top-0 z-50 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
            <div className="absolute left-[32%] top-[2%] z-20">
              <button
                onClick={onClose}
                className="absolute top-[125px] right-6 text-white font-bold hover:text-gray-600 transition-all duration-150"
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
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <h2 className="text-l uppercase font-bold text-gray-200 mb-4 w-full">
                      Start date and time.
                    </h2>
                    <input
                      type="datetime-local"
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[100%] mr-[2%]"
                      placeholder="Start Date and Time"
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <h2 className="text-l uppercase font-bold text-gray-200 mb-4 w-full">
                      End date and time.
                    </h2>
                    <input
                      type="datetime-local"
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[100%] mr-[2%]"
                      placeholder="End Date and Time"
                      onChange={(e) => setEndDate(e.target.value)}
                    />
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
