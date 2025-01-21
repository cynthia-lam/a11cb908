import '../css/modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='modal' onClick={onClose}>
      <div className='children-container'>
        {children}
      </div>
    </div>
  );
};

export default Modal;