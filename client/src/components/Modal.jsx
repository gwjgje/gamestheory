import style from '../styles/Modal.module.css';
import { useCallback } from 'react'

function Modal({ children }) {
     const closeModal = useCallback((e) => {
          e.stopPropagation();
          document.querySelector('dialog').close()
     }, [])

     const closeOnOverlay = useCallback((e) => {
          const dialogDimensions = e.target.getBoundingClientRect()
          if (
               e.clientX < dialogDimensions.left ||
               e.clientX > dialogDimensions.right ||
               e.clientY < dialogDimensions.top ||
               e.clientY > dialogDimensions.bottom
          ) {
               e.target.close()
          }
     }, [])


     return (
          <dialog className={style.modal} onClick={closeOnOverlay}>
               <button onClick={closeModal}>❌</button>
               <article>
                    {children}
               </article>
          </dialog>
     )
}

export default Modal