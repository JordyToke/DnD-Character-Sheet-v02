import React from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  content: string;
  id: string;
  ref: React.Ref<HTMLDialogElement>;
  cursorPosition?: { x: number; y: number };
};

/**
  * Tooltip component that displays a tooltip with the provided content and id.
  * The tooltip is styled using the Tooltip.module.css file and can be used to provide additional information or hints to the user when hovering over an element.
  * @param content - The content to be displayed inside the tooltip.
  * @param id - The unique identifier for the tooltip element.
  * @returns A React component that renders a tooltip with the specified content and id.
  */
const Tooltip = ({ content, id, ref }: TooltipProps) => {

  return (
    <dialog ref={ref} id={id} className={styles.tooltip}>
      <p>{content}</p>
    </dialog>
  );
};

export default Tooltip;
