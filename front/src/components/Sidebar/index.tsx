import React from 'react';
import { Link } from 'react-router-dom';

import { BiClinic } from 'react-icons/bi';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { BiConversation } from 'react-icons/bi';

import Section from '@@/components/Sidebar/Section';
import Footer from '@@/components/Sidebar/Footer';

const Sidebar: React.FC<{ logged?: boolean }> = ({ logged = true }) => {
  if (!logged) {
    return (
      <div className="relative sm:bg-white flex sm:mt-0 w-full sm:w-[190px]">
        <div className="w-full sm:w-[190px] sm:fixed sm:h-full">
          <Link to="/home" className="block mx-auto w-fit m-3">
            <img src="/logo_blackyellow.svg" className="h-10" />
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="w-[190px] relative flex">
      <div className="bg-white flex flex-col justify-between h-full fixed">
        <div className="flex flex-col">
          <Link to="/home" className="mt-6 mb-4 ml-3">
            <img src="/logo_blackyellow.svg" className="h-10" />
          </Link>

          <Section Icon={BiClinic} title="Mes mesures" to="/wards" />
          <Section
            Icon={IoCalendarClearOutline}
            title="Calendrier"
            to="/calendar"
          />
          <Section
            Icon={BiConversation}
            title="Messagerie"
            to="/conversations"
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
