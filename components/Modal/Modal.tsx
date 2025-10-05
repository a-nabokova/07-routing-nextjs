'use client';


import css from './Modal.module.css'
import { useEffect } from 'react';
import { createPortal } from "react-dom";
import { useRouter } from 'next/navigation';

 

interface ModalProps {
  onClose?: () => void ;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {

  const router = useRouter();
  
  const close = () => {
    if (onClose) {
      onClose();
    } else {
      router.back(); 
    }
  };


 useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
   document.addEventListener('keydown', handleEsc);
       document.body.style.overflow = 'hidden';


    return () => {
     document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
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