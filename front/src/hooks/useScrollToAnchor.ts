import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToAnchor = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const anchorId = location.hash.substring(1);

      setTimeout(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  }, [location]);
};

export default useScrollToAnchor;
