import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Back/forward navigation keeps whatever position the browser restores.
    if (navigationType === 'POP') {
      return;
    }

    // 'instant' overrides the global smooth scroll-behavior so new pages
    // do not animate up from the previous scroll position.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, navigationType]);

  return null;
}

export default ScrollToTop;
