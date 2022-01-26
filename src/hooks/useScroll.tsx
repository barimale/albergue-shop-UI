import { RefObject } from 'react';

function useScroll<T extends HTMLElement = HTMLElement> (
  elementRef: RefObject<T>,
) {
  const top = () => {
    const node = elementRef?.current;

    if (node) {
      node.scrollTo(0, 0);
    }
  };

  const bottom = () => {
    const node = elementRef?.current;

    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  };

  return {
    top, bottom,
  };
}

export default useScroll;
