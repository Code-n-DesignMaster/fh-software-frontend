import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const Portal: FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && createPortal(children, document.querySelector('#modal'));
};
