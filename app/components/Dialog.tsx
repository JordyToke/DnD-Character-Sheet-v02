import React, { useRef, useState, type DialogHTMLAttributes, type PropsWithChildren, type Ref } from "react";
import styles from "./Dialog.module.css";

interface DialogProps extends PropsWithChildren {
  ref?: Ref<HTMLDialogElement>;
  className?: string;
}

const Dialog = ({ className = '', children, ref }: DialogProps) => {

  return (
    <dialog className={className + styles['dialog']} ref={ref}>
      {children}
    </dialog>
  );
};

export default Dialog;
