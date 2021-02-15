import { useEffect, useState } from 'react';

const usePrimary = () => {
  const [color, setColor] = useState('def');

  const setMode = (color) => {
    localStorage.setItem('primary', color);
    setColor(color);
  };

  useEffect(() => {
    const localColor = localStorage.getItem('primary');
    localColor && setColor(localColor);
  }, []);
  return [color, setMode];
};

export default usePrimary;
