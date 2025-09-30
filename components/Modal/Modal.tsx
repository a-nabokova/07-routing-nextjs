'use client';


import css from './Modal.module.css'
import { useEffect } from 'react';
import { createPortal } from "react-dom";

 

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {

 useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
   document.addEventListener('keydown', handleEsc);
       document.body.style.overflow = 'hidden';


    return () => {
     document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };


    return createPortal(
        <div
  className={css.backdrop} onClick={handleBackdropClick}
  role="dialog"
  aria-modal="true"
>
  <div className={css.modal}>
      
        {children}
  </div>
      </div>,
       document.getElementById("modal-root") as HTMLDivElement
    )
}