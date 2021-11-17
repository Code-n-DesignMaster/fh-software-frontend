import { useEffect } from 'react';

const useDisableInspect = (disable: boolean) => {
  const handleContextMenu = () => {
    return false;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key || event.keyCode;

    if (key === 123) {
      event.preventDefault();
      return false;
    }
    if (event.ctrlKey && event.shiftKey && key === 73) {
      event.preventDefault();
      return false;
    }
    if (event.ctrlKey && event.shiftKey && key === 74) {
      event.preventDefault();
      return false;
    }
    if (event.ctrlKey && key === 85) {
      event.preventDefault();
      return false;
    }
  };

  useEffect(() => {
    if (disable) {
      document.body.addEventListener('contextmenu', handleContextMenu);
      document.body.setAttribute('oncontextmenu', 'return false');
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [disable]);
};

export default useDisableInspect;
