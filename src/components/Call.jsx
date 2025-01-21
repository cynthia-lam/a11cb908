import React, { useState, useEffect } from 'react';
import Modal from "./Modal.jsx";
import '../css/call.css';

// assets
import answeredCallIcon from '../assets/answered-call.png';

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

  const displayCallType = () => {
    if (call_type === 'missed') return <img src='/assets/missed-call.png' className='call-type-logo' />;
    if (call_type === 'answered') return <img src={answeredCallIcon} className='call-type-logo' />;
    if (call_type === 'voicemail') return <img src='/assets/voicemail-call.png' className='call-type-logo' />;
  };

  return (
    <li onClick={toggleModal} className='call'>
      <div className='call-info-container'>
        <div className='call-info-top'>
          <div className='call-type'>
            {displayCallType()}
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
        <button onClick={toggleModal} className='call-action-button'><img src='/assets/details.png' className='call-action-logo' /></button>
        <button onClick={handleToggleArchive} className='call-action-button'>
          {is_archived ?
            <img src='/assets/unarchive.png' className='call-action-logo' /> :
            <img src='/assets/archive.png' className='call-action-logo' />}
        </button>
      </div>

      <Modal isOpen={modalOpen} toggleModal={toggleModal} className='modal'>
        <div className='modal-top'>
          <div>{displayCallType()}</div>
          <div className='modal-X-button-container'>
            <button onClick={toggleModal} className='modal-X-button'>X</button>
          </div>
        </div>
        <br />
        <div className='modal-children'>
          <div className='modal-children-top'>
          <img src='/assets/foot-icon-2.png' className='modal-person-icon'></img>
          <span className='modal-from-name'>
            {from}
          </span>
          </div>
          <div>Call on {created_at.slice(0, 10)} lasted for {`${Math.floor(duration / 60)}m ${duration % 60}s`}</div>
          <br />
          <div>{direction.charAt(0).toUpperCase() + direction.slice(1)}</div>
          <div>Aircall number: {via}</div>
          <br />
          <div className='call-id'>#{id}</div>
        </div>
      </Modal>
    </li>
  );
};

export default Call;
