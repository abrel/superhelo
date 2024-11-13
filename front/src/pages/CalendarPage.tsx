import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto my-4">
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        messages={{
          week: 'Semaine',
          work_week: 'Semaine de travail',
          day: 'Jour',
          month: 'Mois',
          previous: 'Antérieur',
          next: 'Prochain',
          today: `Aujourd'hui`,
          agenda: 'Ordre du jour',

          showMore: (total) => `+${total} plus`,
        }}
        onSelectEvent={(event) => {}}
      />
    </div>
  );
};

export default CalendarPage;
