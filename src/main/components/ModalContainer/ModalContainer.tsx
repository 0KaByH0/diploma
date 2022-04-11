import React from 'react';
import ReactDOM from 'react-dom';

import './ModalContainer.styles.scss';

export const ModalContainer: React.FC<{ setOpen?: (t: any) => void }> = ({ setOpen, children }) => {
  const close = () => {
    setOpen?.(false);
  };
  return ReactDOM.createPortal(
    <>
      <div className="modal-shadow" onClick={close} />
      <div className="modal">{children}</div>
    </>,
    document.getElementById('app-modal') as HTMLElement,
  );
};
