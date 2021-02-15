import { useEffect, useState } from 'react';

const useSecondary = () => {
  const [color, setColor] = useState('def');

  const setMode = (color) => {
    localStorage.setItem('secondary', color);
    setColor(color);
  };

  useEffect(() => {
    const localColor = localStorage.getItem('secondary');
    localColor && setColor(localColor);
  }, []);
  return [color, setMode];
};

export default useSecondary;
