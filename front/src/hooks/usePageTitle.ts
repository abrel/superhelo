import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let title: string;

    switch (true) {
      case location.pathname.startsWith('/dashboard'):
        title = 'Dashboard';
        break;
      default:
        title = 'SuperHelo';
        break;
    }

    document.title = title;
  }, [location]);
};

export default usePageTitle;
