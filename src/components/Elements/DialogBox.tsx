import { useRef } from "react";


export const DialogBox = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return <dialog ref={modalRef}>Are You Sure?</dialog>;
};
