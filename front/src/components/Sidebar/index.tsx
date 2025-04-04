import React from 'react';
import { Link } from 'react-router-dom';
import { LuHouse, LuMessageSquare, LuShield, LuCalendar } from 'react-icons/lu';
import Section from '@@/components/Sidebar/Section';
import Footer from '@@/components/Sidebar/Footer';

const Sidebar: React.FC<{ logged?: boolean }> = ({ logged = true }) => {
  if (!logged) {
    return (
      <div className="relative sm:bg-white flex sm:mt-0 w-full sm:w-[190px]">
        <div className="w-full sm:w-[190px] sm:fixed sm:h-full">
          <a
            href="https://www.superhelo.fr"
            className="block mx-auto w-fit m-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/logo.svg" className="h-10" />
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="w-[190px] relative flex">
      <div className="bg-white flex flex-col justify-between h-full fixed">
        <div className="flex flex-col">
          <Link to="/home" className="mt-6 mb-4 ml-3">
            <img src="/logo.svg" className="h-10" />
          </Link>

          <Section Icon={LuHouse} title="Acceuil" to="/home" />
          <Section
            Icon={LuMessageSquare}
            title="Messagerie"
            to="/conversations"
            not="wards"
          />
          <Section Icon={LuShield} title="Mes mesures" to="/wards" />
          <Section Icon={LuCalendar} title="Calendrier" to="/calendar" />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
