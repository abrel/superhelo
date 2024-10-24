import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let title: string;

    switch (true) {
      case location.pathname.startsWith('/patients'):
        title = 'Patients';
        break;
      case location.pathname.startsWith('/calendar'):
        title = 'Calendrier';
        break;
      case location.pathname.startsWith('/conversations'):
        title = 'Conversations';
        break;
      case location.pathname.startsWith('/scheduled-messages'):
        title = 'Messages programmés';
        break;
      case location.pathname.startsWith('/template-messages'):
        title = 'Messages types';
        break;
      case location.pathname.startsWith('/practitioner-contacts'):
        title = 'Praticiens';
        break;
      case location.pathname.startsWith('/tasks'):
        title = 'Tâches';
        break;
      case location.pathname.startsWith('/faxes'):
        title = 'Faxs';
        break;
      case location.pathname.startsWith('/metrics'):
        title = 'Métriques';
        break;
      default:
        title = 'Unpatient';
        break;
    }

    document.title = title;
  }, [location]);
};

export default usePageTitle;
