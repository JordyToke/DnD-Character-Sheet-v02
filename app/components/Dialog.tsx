import React, { type DialogHTMLAttributes, type PropsWithChildren, type Ref } from "react";

interface DialogProps extends PropsWithChildren {
  ref?: Ref<HTMLDialogElement>
}

const Dialog = ({ children, ref }: DialogProps) => {

  return (
    <dialog ref={ref}>
      {children}
    </dialog>
  );
};

export default Dialog;
