import React, { useState, useEffect } from 'react';
import Modal from "./Modal.jsx";
import '../css/call.css';

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
    <li onClick={toggleModal} className='call'>
      <div className='call-info-container'>
        <div className='call-type'>
          {call_type === 'missed' && <img src='src/assets/missed-call.png' className='call-type-logo'></img>}
          {call_type === 'answered' && <img src='src/assets/answered-call.png' className='call-type-logo'></img>}
          {call_type === 'voicemail' && <img src='src/assets/voicemail-call.png' className='call-type-logo'></img>}
        </div>
        <div className='call-direction'>
          {direction === 'inbound' && <span>from</span>}
          {direction === 'outbound' && <span>to</span>}
        </div>
        <div className='call-to'>
          {to}
        </div>
        <div className='call-duration'>
        Duration: {duration}
        </div>
      </div>

      <div className='buttons-container'>
        <button onClick={toggleModal}>DETAILS</button>
        |
        <button onClick={handleToggleArchive}>{is_archived ? 'UNARCHIVE' : 'ARCHIVE'}</button>
      </div>

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
