import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
        <dialog className={`modal ${open ? 'show' : ''}`} ref={dialog} onClose={onClose}>
            {open ? <div id='cart-items'><ul><li>{children}</li></ul></div> : null}
        </dialog>,
        document.getElementById('modal')
    );
}

export default Modal;


