import React, { useState, useEffect } from 'react';
import Modal from "./Modal.jsx";

const Call = ({ data, toggleArchive }) => {
  const { id, created_at, direction, from, to, via, duration, is_archived, call_type } = data;
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = (e) => {
    e.stopPropagation();
    setModalOpen(!modalOpen);
  };

  const handleToggleArchive = (e) => {
    e.stopPropagation();
    toggleArchive(id, is_archived);
  };

  return (
    <li onClick={toggleModal}>
      {call_type} call from {from}
      {direction}
      {duration}
      is it archived? {is_archived}
      <button
        onClick={toggleModal}>
        DETAILS
      </button>
      <button
        onClick={handleToggleArchive}>
        {is_archived ? 'UNARCHIVE' : 'ARCHIVE'}
      </button>
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
