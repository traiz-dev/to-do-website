import React from 'react'

const Modal = ({ isModalOpen, onClose }) => {
  return (
    <>
      {isModalOpen && (
        <>
            <div>
                MODAL
                <button onClick={() => onClose()}>CLOSE</button>
            </div>
        </>
      )}
    </>
  )
}

export default Modal
