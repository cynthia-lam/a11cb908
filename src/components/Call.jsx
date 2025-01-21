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
        <div className='call-info-top'>
          <div className='call-type'>
            {call_type === 'missed' && <img src='src/assets/missed-call.png' className='call-type-logo' />}
            {call_type === 'answered' && <img src='src/assets/answered-call.png' className='call-type-logo' />}
            {call_type === 'voicemail' && <img src='src/assets/voicemail-call.png' className='call-type-logo' />}
          </div>
          <div className='call-to-from'>
            {direction === 'inbound' && <span>from</span>}
            {direction === 'outbound' && <span>to</span>} {to}
          </div>
        </div>
        <div className='call-info-bottom'>
          <div className='call-timing'>
            {created_at.slice(0, 10)} | {`${Math.floor(duration / 60)}m ${duration % 60}s`}
          </div>
        </div>
      </div>

      <div className='actions-container'>
        <button onClick={toggleModal} className='call-action-button'><img src='src/assets/details.png' className='call-action-logo' /></button>
        <button onClick={handleToggleArchive} className='call-action-button'>
          {is_archived ?
            <img src='src/assets/unarchive.png' className='call-action-logo' /> :
            <img src='src/assets/archive.png' className='call-action-logo' />}
        </button>
      </div>

      <Modal isOpen={modalOpen} toggleModal={toggleModal} className='modal'>
        <div className='modal-button'>
          <button onClick={toggleModal}>X</button>
        </div>
        <br/>
        <div className='modal-children'>
          <div>ID: {id}</div>
          <div>Created At: {created_at}</div>
          <div>Direction: {direction}</div>
          <div>From: {from}</div>
          <div>To: {to}</div>
          <div>Via: {via}</div>
          <div>Duration: {duration}</div>
          <div>Is Archived: {is_archived ? 'Yes' : 'No'}</div>
          <div>Call Type: {call_type}</div>
        </div>
      </Modal>
    </li>
  );
};

export default Call;
