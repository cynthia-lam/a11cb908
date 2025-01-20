import React, { useState, useEffect } from 'react';
import Modal from "./Modal.jsx";

const Call = ({ data }) => {
  const { id, created_at, direction, from, to, via, duration, is_archived, call_type } = data;
  const[modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <li onClick={toggleModal}>
      {call_type} call from {from}
      {direction}
      {duration}
      <Modal isOpen={modalOpen} toggleModal={toggleModal}>
        <button onClick={toggleModal}>X</button>
      </Modal>
    </li>
  );
};

export default Call;
