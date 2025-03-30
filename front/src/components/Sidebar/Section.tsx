import React, { useMemo } from 'react';
import cx from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { LuChevronDown, LuChevronRight } from 'react-icons/lu';

const Section: React.FC<{
  Icon: React.FC<{ size?: number; className?: string }>;
  title: string;
  to: string;
  not?: string;
  isError?: boolean;
  subSections?: { title: string; to: string }[];
}> = ({ Icon, title, to, not, isError, subSections }) => {
  const location = useLocation();
  const isSelected = useMemo(() => {
    if (!location.pathname.includes(to)) {
      return false;
    }
    if (not) {
      return !location.pathname.includes(not);
    }

    return true;
  }, [location.pathname, to, not]);
  const txtCS = useMemo(() => {
    if (isError) {
      return 'text-red-500';
    }

    if (isSelected) {
      return 'text-sky-500';
    }

    return 'text-slate-600';
  }, [isSelected, isError]);

  const iconCS = useMemo(() => {
    if (isError) {
      return 'text-red-500';
    }

    if (isSelected) {
      return 'text-sky-500';
    }

    return 'text-slate-400';
  }, [isSelected, isError]);

  return (
    <div>
      <Link
        to={to}
        className="flex flex-row items-center p-3 font-main hover:bg-slate-50"
      >
        <Icon size={20} className={cx(iconCS)} />
        <span className={cx('ml-1 text-sm font-semibold', txtCS)}>{title}</span>
        {isSelected && !!subSections?.length && (
          <LuChevronDown size={12} className="ml-auto text-sky-500" />
        )}
        {!isSelected && !!subSections?.length && (
          <LuChevronRight size={12} className="ml-auto text-slate-400" />
        )}
      </Link>
      {isSelected && (
        <div className="">
          {subSections?.map((subSection, i) => {
            const isSubSectionSelected =
              location.pathname.includes(subSection.to) ||
              (i === 0 && location.pathname === to);
            return (
              <Link
                key={i}
                to={subSection.to}
                className="block p-2 pl-8 font-main hover:bg-slate-50"
              >
                <span
                  className={cx(
                    'ml-1 text-sm',
                    isSubSectionSelected ? 'text-sky-500' : 'text-slate-600',
                  )}
                >
                  {subSection.title}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Section;
