import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiShieldUserLine } from 'react-icons/ri';
import { IoCalendarClearOutline } from 'react-icons/io5';

const handleLinkStyle = (pathname: string, targetPathName: string) => {
  if (pathname.includes(targetPathName)) {
    return 'text-main underline flex flex-row items-center mb-6';
  } else {
    return 'flex flex-row items-center mb-6';
  }
};

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-white font-main">
      <div className="flex flex-col p-4">
        <Link
          className={handleLinkStyle(location.pathname, '/patients')}
          to="/patients"
        >
          <RiShieldUserLine size={30} />
          <span className="ml-1 text-sm">Protégés</span>
        </Link>

        <Link
          className={handleLinkStyle(location.pathname, '/calendar')}
          to="/calendar"
        >
          <IoCalendarClearOutline size={30} />
          <span className="ml-1 text-sm">Calendrier</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
