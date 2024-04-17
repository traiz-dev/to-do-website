import React from 'react'

const TaskCard = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => {
        return (
            <div key={task.id}>
                <p className='text-4xl text-red-500'>{task.title}</p>
                <p className='text-3xl text-blue-400'>{task.content}</p>
                <p className='text-4xl text-yellow-200'>{task.priorityLevel}</p>
            </div>
        );
      })}
    </div>
  )
}

export default TaskCard
