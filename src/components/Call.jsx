import React, { useState, useEffect } from 'react';
import Modal from "./Modal.jsx";

const Call = ({ data }) => {
  const { id, created_at, direction, from, to, via, duration, is_archived, call_type } = data;
  const [modalOpen, setModalOpen] = useState(false);

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
        <br />
        <div>ID: {id}</div>
        <div>Created At: {created_at}</div>
        <div>Direction: {direction}</div>
        <div>From: {from}</div>
        <div>To: {to}</div>
        <div>Via: {via}</div>
        <div>Duration: {duration}</div>
        <div>Is Archived: {is_archived ? 'Yes' : 'No'}</div>
        <div>Call Type: {call_type}</div>
      </Modal>
    </li>
  );
};

export default Call;
