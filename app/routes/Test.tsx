import React, { useState, type ChangeEvent } from 'react';
import type { Route } from '../+types/root';
import Tooltip from '~/components/Tooltip';
import useDebounce from '~/hooks/useDebounce';

export async function loader({ params }: Route.LoaderArgs) {}

const Test = ({ params }: Route.ComponentProps) => {
  const [textInput, setTextInput] = useState('');
  const tooltipRef = React.useRef<HTMLDialogElement | null>(null);

  const openTooltip = () => {
    tooltipRef.current?.show();
  };

  const closeTooltip = () => {
    if (tooltipRef.current?.open) {
      tooltipRef.current?.close();      console.log('tooltip closed');
    }
  };

  const handleTooltip = (event: React.UIEvent) => {
    // open tooltip
    const openTimer = setTimeout(() => {
      openTooltip();
    }, 500)

    const handleMouseLeave = () => {
      clearTimeout(openTimer);
      closeTooltip()
    }

    // add mouseleave handler
    event.target.addEventListener('mouseleave', handleMouseLeave, { once: true });
  };

  const debounceUpdate = useDebounce((newValue: string) => {
    console.log(`Debounce Updated Input to ${newValue}`);
    setTextInput(newValue);
  }, 300);

  return (
    <section className='test'>
      <div>{params.testId}</div>
      <div onMouseEnter={(e) => handleTooltip(e)}>
        <p>This is a test paragraph for the tooltip element.</p>
        <Tooltip
          ref={tooltipRef}
          id='test-tooltip'
          content='This is a tooltip!'
        />
      </div>
      <label htmlFor='inputText'>Input Text:&nbsp;</label>
      <input
        id='inputText'
        name='inputText'
        type='text'
        onChange={(e) => debounceUpdate(e.target.value)}
      />
      <label htmlFor='outputText'>Output Text:&nbsp;</label>
      <output>{textInput}</output>
    </section>
  );
};

export default Test;
