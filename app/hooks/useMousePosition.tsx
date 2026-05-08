import React, { useState, useEffect } from 'react';
import throttle from '~/utilities/throttle';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const throttledUpdateMousePosition = throttle(updateMousePosition, 100);

    window.addEventListener('mousemove', throttledUpdateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;
