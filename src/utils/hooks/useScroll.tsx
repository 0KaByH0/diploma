import React from 'react';

export const useScroll = () => {
  const [scrollX, setScrollX] = React.useState<number>(0);
  const [scrollY, setScrollY] = React.useState<number>(0);

  //Ace editor
  const onScroll = React.useCallback((editor) => {
    setScrollX(editor.renderer.scrollTop);
    setScrollY(editor.renderer.scrollLeft);
  }, []);

  return { scrollX, scrollY, onScroll };
};
